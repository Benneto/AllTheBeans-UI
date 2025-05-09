import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Bean } from '../../core/bean.model';
import { BeanService } from '../../core/bean.service';
import { MatDialog } from '@angular/material/dialog';
import { BeanDetailDialogComponent } from '../bean-detail-dialog/bean-detail-dialog.component';

@Component({
  selector: 'app-bean-list',
  templateUrl: './bean-list.component.html',
  standalone: false,
})
export class BeanListComponent implements OnInit {
  beans: Bean[] = [];
  beanOfTheDay: Bean | undefined;
  filtered: Bean[] = [];
  isLoading: boolean = true;
  maxPrice: number | null = null;

  private searchInput: Subject<string> = new Subject<string>();
  private priceInput: Subject<number | null> = new Subject<number | null>();

  constructor(private beanService: BeanService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isLoading = true;
  
    this.beanService.getBeans().subscribe((data: any[]) => {
      this.beans = data;
      this.beanOfTheDay = data.find(bean => bean.isBeanOfTheDay);
      this.updateFiltered('');
      this.isLoading = false;
    });
  
    this.searchInput.pipe(debounceTime(300)).subscribe(searchTerm => {
      this.isLoading = true;
      setTimeout(() => {
        this.updateFiltered(searchTerm);
        this.isLoading = false;
      });
    });

    this.priceInput.pipe(debounceTime(500)).subscribe(max => {
      this.isLoading = true;
      setTimeout(() => {
        this.maxPrice = max;
        this.updateFiltered('');
        this.isLoading = false;
      });
    });
  }

  onSearch(term: string) {
    this.searchInput.next(term);
  }

  updateFiltered(term: string) {
    const lower = term.toLowerCase();
    this.filtered = this.beans
      .filter(bean =>
        bean.name.toLowerCase().includes(lower) ||
        bean.country.toLowerCase().includes(lower) ||
        bean.colour.toLowerCase().includes(lower)
      )
      .filter(bean => {
        const price = parseFloat(bean.cost.replace('£', ''));
        return this.maxPrice === null || price <= this.maxPrice;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  onPriceChange(value: string) {
    if (value.trim() === '') {
      this.priceInput.next(null);
      return;
    }
  
    const numericValue = parseFloat(value);
    this.priceInput.next(isNaN(numericValue) ? null : numericValue);
  }
  
  openBeanDetails(bean: Bean): void {
    this.dialog.open(BeanDetailDialogComponent, {
      width: '500px',
      data: bean
    });
  }
}