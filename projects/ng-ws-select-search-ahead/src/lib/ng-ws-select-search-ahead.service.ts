import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NgWsSelectSearchAheadService {
  public filteredItems: any[] = [];
  public selectedItems: any[] = [];
  public allItems: any[] = [];

  public searchValue: string = '';
  public openedState: boolean = false;
  public allSelected: boolean = false;

  public initializeItems(listItems: any[], updateSelectedItems: () => void): void {
    this.allItems = listItems.map(item => ({...item, selected: false}));
    this.filteredItems = [...this.allItems];
    updateSelectedItems();
  }

  public toggleMultiSelectOverlay(isDisabled: boolean): void {
    if (!isDisabled) {
      this.openedState = !this.openedState;
    }
  }

  public filterItems(e: Event, optionLabel: string): void {
    const searchValue: string = (e.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchValue = searchValue;

    this.filteredItems = this.allItems
      .filter(item => !searchValue || item[optionLabel].trim().toLowerCase().includes(searchValue));

    this.filteredItems.forEach(item => {
      item.selected = this.selectedItems.some(selectedItem =>
        selectedItem[optionLabel] === item[optionLabel]
      );
    });

    this.updateAllSelectedState();
  }

  public toggleSelectItem(
    item: any,
    optionLabel: string,
    isMultiple: boolean,
  ): void {
    if (!isMultiple) {
      if (this.selectedItems.length === 1 && this.selectedItems[0][optionLabel] === item[optionLabel]) {
        this.selectedItems = [];
        this.allItems.forEach(i => i.selected = false);
      } else {
        this.selectedItems = [item];
        this.allItems.forEach(i => i.selected = i[optionLabel] === item[optionLabel]);
      }
    } else {
      const idx: number = this.selectedItems.findIndex(i => i[optionLabel] === item[optionLabel]);
      if (idx > -1) {
        this.selectedItems.splice(idx, 1);
        item.selected = false;
      } else {
        this.selectedItems.push(item);
        item.selected = true;
      }
    }

    const allItemIdx: number = this.allItems.findIndex(i => i[optionLabel] === item[optionLabel]);
    if (allItemIdx > -1) {
      this.allItems[allItemIdx].selected = this.selectedItems.some(i => i[optionLabel] === item[optionLabel]);
    }
    const filteredItemIdx: number = this.filteredItems.findIndex(i => i[optionLabel] === item[optionLabel]);
    if (filteredItemIdx > -1) {
      this.filteredItems[filteredItemIdx].selected = this.selectedItems.some(i => i[optionLabel] === item[optionLabel]);
    }

    this.updateAllSelectedState();
  }

  public toggleSelectAll(optionLabel: string): void {
    this.allSelected = !this.allSelected;

    if (this.allSelected) {
      this.filteredItems.forEach(item => {
        item.selected = true;
        if (!this.selectedItems.some(selectedItem => selectedItem[optionLabel] === item[optionLabel])) {
          this.selectedItems.push(item);
        }
      });
    } else {
      this.filteredItems.forEach(item => {
        item.selected = false;
        const idx: number = this.selectedItems
          .findIndex(selectedItem => selectedItem[optionLabel] === item[optionLabel]);
        if (idx > -1) {
          this.selectedItems.splice(idx, 1);
        }
      });
    }

    this.allItems.forEach(item => {
      item.selected = this.selectedItems.some(selectedItem => selectedItem[optionLabel] === item[optionLabel]);
    });
  }

  public updateAllSelectedState(): void {
    this.allSelected = this.filteredItems.length > 0 && this.filteredItems.every(item => item.selected);
  }
}
