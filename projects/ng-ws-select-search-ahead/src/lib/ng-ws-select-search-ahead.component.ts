import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgClass, NgOptimizedImage, NgStyle } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { NgWsSelectSearchAheadService } from "./ng-ws-select-search-ahead.service";
import { OutsideClickDirective } from "./directives";
import { HighlightSearchPipe } from "./pipes";

@Component({
  selector: 'ng-ws-select-search-ahead',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    OutsideClickDirective,
    HighlightSearchPipe,
    NgOptimizedImage,
    NgStyle,
  ],
  providers: [NgWsSelectSearchAheadService],
  templateUrl: './ng-ws-select-search-ahead.component.html',
  styleUrl: './ng-ws-select-search-ahead.component.scss'
})
export class NgWsSelectSearchAheadComponent implements OnChanges, OnInit {
  public _searchAheadService: NgWsSelectSearchAheadService = inject(NgWsSelectSearchAheadService);

  @Input({ required: true }) listItems: any[] = [];
  @Input({ required: true }) optionLabel: string = '';

  /** Conditional options */
  @Input() pending: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isMultiple: boolean = false;
  @Input() hideCheckboxes: boolean = false;

  /** Inputs for Texts/Icons */
  @Input() placeHolder: string = 'Select';
  @Input() placeholderPostfix: string = 'Items selected';
  @Input() loadingLabel: string = 'Loading';
  @Input() loadingIcon: string = '';
  @Input() noDataLabel: string = 'No Items';

  /** Inputs for adding additional styling */
  @Input() wrapperClasses: string = '';
  @Input() boxClasses: string = '';
  @Input() boxTextClasses: string = '';
  @Input() overlayClasses: string = '';
  @Input() searchWrapperClasses: string = '';
  @Input() checkboxClasses: string = '';
  @Input() searchInputWrapperClasses: string = '';
  @Input() closeBtnClasses: string = '';
  @Input() itemClasses: string = '';
  @Input() loaderClasses: string = '';
  @Input() itemLabelClasses: string = '';
  @Input() noDataClasses: string = '';
  @Input() noDataTextClasses: string = '';

  /** Event emitters */
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any | any[]>();
  @Output() onItemClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onToggleAllChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSearchInputChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();


  ngOnInit(): void {
    this.initializeItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listItems'] && !changes['listItems'].firstChange) {
      this.initializeItems();
    }
  }

  private initializeItems(): void {
    this._searchAheadService.initializeItems(this.listItems, this.updateSelectedItems.bind(this));
  }

  public toggleMultiSelectOverlay(): void {
    this._searchAheadService.toggleMultiSelectOverlay(this.isDisabled);
  }

  public closeOverlay(): void {
    this._searchAheadService.openedState = false;
    this.onClose.emit(true);
  }

  public filterItems(e: Event): void {
    this._searchAheadService.filterItems(e, this.optionLabel);
    this.onSearchInputChange.emit((e.target as HTMLInputElement).value);
    this.updatePlaceholder();
  }

  public toggleSelectItem(item: any): void {
    this._searchAheadService.toggleSelectItem(
      item,
      this.optionLabel,
      this.isMultiple,
    );
    this.updateSelectedItems();

    if (!this.isMultiple) {
      this.closeOverlay();
    }

    this.onItemClicked.emit(item);
  }

  public toggleSelectAll(e: Event): void {
    this._searchAheadService.toggleSelectAll(this.optionLabel);
    this.onToggleAllChange.emit((e.target as HTMLInputElement).checked);
    this.updateSelectedItems();
  }

  private updateSelectedItems(): void {
    this.selectionChange.emit(this.isMultiple ? this._searchAheadService.selectedItems : this._searchAheadService.selectedItems[0] || null);
    this.updatePlaceholder();
  }

  private updatePlaceholder(): void {
    if (this._searchAheadService.selectedItems.length === 0) {
      this.placeHolder = 'Select';
    } else if (this._searchAheadService.selectedItems.length === 1) {
      this.placeHolder = this._searchAheadService.selectedItems[0][this.optionLabel];
    } else if (this.isMultiple) {
      this.placeHolder = `${ this._searchAheadService.selectedItems.length } ${ this.placeholderPostfix }`;
    }
  }

  /** @desc Adding dynamic CSS variable to use in stylesheet
   * (for styling ::after or ::before elements) */
  public setHighlightColorVariableForCSS(): Record<string, string> {
    return {
      '--highlight-background': '',
      '--highlight-color': '',
    };
  }
}
