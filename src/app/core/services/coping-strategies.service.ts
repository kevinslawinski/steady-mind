import { computed, effect, Injectable, signal } from '@angular/core';
import {
  CopingStrategy,
  DEFAULT_COPING_STRATEGIES,
  EmotionTag,
  StrategyCategory,
} from '../../../globals/app.constants';

interface UserPreferences {
  favorites: string[];
  customStrategies: CopingStrategy[];
}

@Injectable({
  providedIn: 'root',
})
export class CopingStrategiesService {
  private readonly STORAGE_KEY = 'steady-mind-preferences';

  // Signals for reactive state
  private readonly userPreferences = signal<UserPreferences>(this.loadPreferences());
  private readonly searchQuery = signal('');
  private readonly selectedCategories = signal<StrategyCategory[]>([]);
  private readonly selectedEmotions = signal<EmotionTag[]>([]);
  private readonly showFavoritesOnly = signal(false);

  // Computed signal for all strategies (default + custom)
  readonly allStrategies = computed<CopingStrategy[]>(() => [
    ...DEFAULT_COPING_STRATEGIES,
    ...this.userPreferences().customStrategies,
  ]);

  // Computed signal for filtered strategies
  readonly filteredStrategies = computed<CopingStrategy[]>(() => {
    let strategies = this.allStrategies();
    const search = this.searchQuery().toLowerCase().trim();
    const categories = this.selectedCategories();
    const emotions = this.selectedEmotions();
    const favoritesOnly = this.showFavoritesOnly();
    const favorites = this.userPreferences().favorites;

    // Filter by favorites
    if (favoritesOnly) {
      strategies = strategies.filter((s) => favorites.includes(s.id));
    }

    // Filter by search query
    if (search) {
      strategies = strategies.filter(
        (s) =>
          s.name.toLowerCase().includes(search) ||
          s.description.toLowerCase().includes(search) ||
          s.category.toLowerCase().includes(search),
      );
    }

    // Filter by categories
    if (categories.length > 0) {
      strategies = strategies.filter((s) => categories.includes(s.category));
    }

    // Filter by emotion tags
    if (emotions.length > 0) {
      strategies = strategies.filter((s) => s.emotionTags.some((tag) => emotions.includes(tag)));
    }

    return strategies;
  });

  // Computed signal for favorites
  readonly favorites = computed<string[]>(() => this.userPreferences().favorites);

  constructor() {
    // Persist preferences whenever they change
    effect(() => {
      const prefs = this.userPreferences();
      this.savePreferences(prefs);
    });
  }

  // ========================================
  // Favorites Management
  // ========================================

  toggleFavorite(strategyId: string): void {
    this.userPreferences.update((prefs) => {
      const favorites = [...prefs.favorites];
      const index = favorites.indexOf(strategyId);

      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(strategyId);
      }

      return { ...prefs, favorites };
    });
  }

  isFavorite(strategyId: string): boolean {
    return this.favorites().includes(strategyId);
  }

  // ========================================
  // Custom Strategies Management
  // ========================================

  addCustomStrategy(strategy: Omit<CopingStrategy, 'id' | 'isDefault'>): void {
    const newStrategy: CopingStrategy = {
      ...strategy,
      id: `custom-${Date.now()}`,
      isDefault: false,
    };

    this.userPreferences.update((prefs) => ({
      ...prefs,
      customStrategies: [...prefs.customStrategies, newStrategy],
    }));
  }

  removeCustomStrategy(strategyId: string): void {
    this.userPreferences.update((prefs) => ({
      ...prefs,
      customStrategies: prefs.customStrategies.filter((s) => s.id !== strategyId),
    }));
  }

  // ========================================
  // Filtering
  // ========================================

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  setSelectedCategories(categories: StrategyCategory[]): void {
    this.selectedCategories.set(categories);
  }

  setSelectedEmotions(emotions: EmotionTag[]): void {
    this.selectedEmotions.set(emotions);
  }

  setShowFavoritesOnly(show: boolean): void {
    this.showFavoritesOnly.set(show);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedCategories.set([]);
    this.selectedEmotions.set([]);
    this.showFavoritesOnly.set(false);
  }

  // ========================================
  // Recommendations (for guided prompts)
  // ========================================

  getRecommendedStrategies(emotionTags: EmotionTag[], limit = 5): CopingStrategy[] {
    const strategies = this.allStrategies();

    // Score strategies by how many matching emotion tags they have
    const scored = strategies.map((strategy) => {
      const matchingTags = strategy.emotionTags.filter((tag) => emotionTags.includes(tag)).length;
      return { strategy, score: matchingTags };
    });

    // Sort by score (highest first), then by difficulty (easier first)
    scored.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      const difficultyOrder = { easy: 0, medium: 1, challenging: 2 };
      return difficultyOrder[a.strategy.difficulty] - difficultyOrder[b.strategy.difficulty];
    });

    return scored.slice(0, limit).map((s) => s.strategy);
  }

  // ========================================
  // Local Storage
  // ========================================

  private loadPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }

    return { favorites: [], customStrategies: [] };
  }

  private savePreferences(preferences: UserPreferences): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }
}
