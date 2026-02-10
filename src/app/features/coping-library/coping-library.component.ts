import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  CopingStrategy,
  DifficultyLevel,
  EmotionTag,
  StrategyCategory,
} from '../../../globals/app.constants';
import { CopingStrategiesService } from '../../core/services/coping-strategies.service';

@Component({
  selector: 'steady-coping-library',
  templateUrl: './coping-library.component.html',
  styleUrl: './coping-library.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopingLibraryComponent {
  private readonly copingService = inject(CopingStrategiesService);

  // Computed signals from service
  protected readonly strategies = this.copingService.filteredStrategies;
  protected readonly favorites = this.copingService.favorites;

  // Local UI state
  protected readonly searchQuery = signal('');
  protected readonly showFilters = signal(false);
  protected readonly expandedStrategies = signal<Set<string>>(new Set());
  protected readonly selectedStrategy = signal<CopingStrategy | null>(null);

  // Filter states
  protected readonly selectedCategories = signal<StrategyCategory[]>([]);
  protected readonly selectedEmotions = signal<EmotionTag[]>([]);
  protected readonly showFavoritesOnly = signal(false);

  // Available filter options
  protected readonly categoryOptions: { value: StrategyCategory; label: string; icon: string }[] = [
    { value: 'breathing', label: 'Breathing', icon: '💨' },
    { value: 'grounding', label: 'Grounding', icon: '🌱' },
    { value: 'mindfulness', label: 'Mindfulness', icon: '🧘' },
    { value: 'meditation', label: 'Meditation', icon: '🕉️' },
    { value: 'cognitive', label: 'Cognitive', icon: '🧠' },
    { value: 'physical', label: 'Physical', icon: '🏃' },
  ];

  protected readonly emotionOptions: { value: EmotionTag; label: string }[] = [
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'stress', label: 'Stress' },
    { value: 'overwhelm', label: 'Overwhelm' },
    { value: 'sadness', label: 'Sadness' },
    { value: 'panic', label: 'Panic' },
    { value: 'racing-thoughts', label: 'Racing Thoughts' },
    { value: 'general', label: 'General' },
  ];

  // Computed for active filters count
  protected readonly activeFiltersCount = computed(() => {
    let count = 0;
    if (this.selectedCategories().length > 0) count += this.selectedCategories().length;
    if (this.selectedEmotions().length > 0) count += this.selectedEmotions().length;
    if (this.showFavoritesOnly()) count += 1;
    return count;
  });

  // ========================================
  // Search and Filter Actions
  // ========================================

  protected onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.copingService.setSearchQuery(input.value);
  }

  protected toggleFilters(): void {
    this.showFilters.update((show) => !show);
  }

  protected toggleCategory(category: StrategyCategory): void {
    this.selectedCategories.update((categories) => {
      const updated = [...categories];
      const index = updated.indexOf(category);
      if (index > -1) {
        updated.splice(index, 1);
      } else {
        updated.push(category);
      }
      return updated;
    });
    this.copingService.setSelectedCategories(this.selectedCategories());
  }

  protected toggleEmotion(emotion: EmotionTag): void {
    this.selectedEmotions.update((emotions) => {
      const updated = [...emotions];
      const index = updated.indexOf(emotion);
      if (index > -1) {
        updated.splice(index, 1);
      } else {
        updated.push(emotion);
      }
      return updated;
    });
    this.copingService.setSelectedEmotions(this.selectedEmotions());
  }

  protected toggleFavoritesOnly(): void {
    this.showFavoritesOnly.update((show) => !show);
    this.copingService.setShowFavoritesOnly(this.showFavoritesOnly());
  }

  protected clearAllFilters(): void {
    this.searchQuery.set('');
    this.selectedCategories.set([]);
    this.selectedEmotions.set([]);
    this.showFavoritesOnly.set(false);
    this.copingService.clearFilters();
  }

  // ========================================
  // Strategy Card Actions
  // ========================================

  protected toggleFavorite(strategyId: string, event: Event): void {
    event.stopPropagation();
    this.copingService.toggleFavorite(strategyId);
  }

  protected isFavorite(strategyId: string): boolean {
    return this.copingService.isFavorite(strategyId);
  }

  protected toggleExpanded(strategyId: string): void {
    this.expandedStrategies.update((expanded) => {
      const updated = new Set(expanded);
      if (updated.has(strategyId)) {
        updated.delete(strategyId);
      } else {
        updated.add(strategyId);
      }
      return updated;
    });
  }

  protected isExpanded(strategyId: string): boolean {
    return this.expandedStrategies().has(strategyId);
  }

  // ========================================
  // Utility Methods
  // ========================================

  protected getDifficultyLabel(difficulty: DifficultyLevel): string {
    const labels = {
      easy: 'Easy',
      medium: 'Medium',
      challenging: 'Challenging',
    };
    return labels[difficulty];
  }

  protected getDifficultyIcon(difficulty: DifficultyLevel): string {
    const icons = {
      easy: '●',
      medium: '●●',
      challenging: '●●●',
    };
    return icons[difficulty];
  }

  protected getCategoryIcon(category: StrategyCategory): string {
    const option = this.categoryOptions.find((opt) => opt.value === category);
    return option?.icon || '📋';
  }
}
