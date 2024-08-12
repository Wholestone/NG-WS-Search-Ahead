import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlightSearch',
  standalone: true
})
export class HighlightSearchPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, search: string): SafeHtml {
    if (!search) {
      return value;
    }
    const regexp: RegExp = new RegExp(search, 'gi');
    const match: RegExpMatchArray | null = value.match(regexp);

    if (!match) {
      return value;
    }

    const highlighted: string = value.replace(regexp, "<mark>$&</mark>");
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }
}
