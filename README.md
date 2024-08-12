# NgWsSelectSearchAhead

This select/multiselect is a powerful and customizable Angular component for creating searchable dropdown selects with advanced features.

## Features

- Single and multi-select options
- Search functionality with highlighting
- Customizable styling
- Loading state support
- Keyboard navigation (Enter to open, Escape to close)

## Installation

```bash
npm install ng-ws-select-search-ahead
```
## Usage

```angular17html
  <ng-ws-select-search-ahead
    optionLabel="name"
    [listItems]="items"
    [pending]="pendingState"
    [isDisabled]="disabledState"
    [isMultiple]="true"
  
    (selectionChange)="onSelectionChange($event)"
    (onToggleAllChange)="onToggleSelectChange($event)"
    (onSearchInputChange)="onSeearchInputChange($event)"
    (onItemClicked)="onClick($event)"
    (onClose)="onClose($event)"
  />
```

## Inputs
| Input                | Type      | Default     | Description |
|----------------------|-----------|-------------|-------------|
| listItems            | any[]     | Required    | Array of items to display in the dropdown |
| optionLabel          | string    | Required    | Property name to use as the display label for each item |
| pending              | boolean   | false       | Shows loading state when true |
| isDisabled           | boolean   | false       | Disables the component when true |
| isMultiple           | boolean   | false       | Enables multi-select when true |
| hideCheckboxes       | boolean   | false       | Hides checkboxes when true |
| placeHolder          | string    | 'Select'    | Placeholder text |
| loadingLabel         | string    | 'Loading'   | Text to display during loading state |
| loadingIcon          | string    | ''          | URL for custom loading icon |
| noDataLabel          | string    | 'No Items'  | Text to display when no items match the search |
| wrapperClasses       | string    | ''          | Additional CSS classes for the wrapper |
| boxClasses           | string    | ''          | Additional CSS classes for the select box |
| boxTextClasses       | string    | ''          | Additional CSS classes for the box text |
| overlayClasses       | string    | ''          | Additional CSS classes for the dropdown overlay |
| searchWrapperClasses | string    | ''          | Additional CSS classes for the search wrapper |
| checkboxClasses      | string    | ''          | Additional CSS classes for checkboxes |
| searchInputWrapperClasses | string | ''        | Additional CSS classes for the search input wrapper |
| closeBtnClasses      | string    | ''          | Additional CSS classes for the close button |
| itemClasses          | string    | ''          | Additional CSS classes for list items |
| loaderClasses        | string    | ''          | Additional CSS classes for the loader |
| itemLabelClasses     | string    | ''          | Additional CSS classes for item labels |
| noDataClasses        | string    | ''          | Additional CSS classes for the no data message |
| noDataTextClasses    | string    | ''          | Additional CSS classes for the no data text |

## Outputs

| Output              | Type                   | Description |
|---------------------|------------------------|-------------|
| selectionChange     | EventEmitter<any \| any[]> | Emits when the selection changes |
| onItemClicked       | EventEmitter<any>      | Emits when an item is clicked |
| onToggleAllChange   | EventEmitter<boolean>  | Emits when the "Select All" checkbox changes |
| onSearchInputChange | EventEmitter<string>   | Emits when the search input changes |
| onClose             | EventEmitter<boolean>  | Emits when the dropdown closes |


## Customization
This select/multiselect offers extensive customization options through CSS classes. \
You can pass additional classes to various parts of the component to adjust its appearance to match your application's design.
