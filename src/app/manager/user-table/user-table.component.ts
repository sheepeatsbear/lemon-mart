import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { BehaviorSubject, Observable, Subject, merge, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { OptionalTextValidation } from 'src/app/common/validations';
import { IUser } from 'src/app/user/user/user';
import { IUsers, UserService } from 'src/app/user/user/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnDestroy, AfterViewInit, OnChanges {
  displayedColumns = ['name', 'email', 'role', '_id'];
  items$!: Observable<IUser[]>;
  resultsLength = 0;
  hasError = false;
  errorText = '';
  private skipLoading = false;
  private subs = new SubSink();
  useNgRxData = false;
  readonly isLoadingResult$ = new BehaviorSubject(true);
  loading$!: Observable<boolean>;
  refresh$ = new Subject();
  user!: IUser;

  search = new FormControl('', OptionalTextValidation);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private userService: UserService) {
    this.loading$ = this.isLoadingResult$;
  }

  getUsers(
    pageSize: number,
    searchText: string,
    pagesToSkip: number,
    sortColumn: string,
    sortDirection: SortDirection
  ): Observable<IUsers> {
    return this.userService.getUsers(
      pageSize,
      searchText,
      pagesToSkip,
      sortColumn,
      sortDirection
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.subs.sink = this.sort.sortChange.subscribe(() => this.paginator.firstPage());
    if (this.skipLoading) {
      return;
    }
    this.items$ = merge(
      this.refresh$,
      this.sort.sortChange,
      this.paginator.page,
      this.search.valueChanges.pipe(debounceTime(1000))
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResult$.next(true);
        return this.getUsers(
          this.paginator.pageSize,
          this.search.value,
          this.paginator.pageIndex,
          this.sort.active,
          this.sort.direction
        );
      }),
      map((results: { total: number; data: IUser[] }) => {
        console.log(results);

        this.isLoadingResult$.next(false);
        this.hasError = false;
        this.resultsLength = results.total;
        return results.data;
      }),
      catchError((err) => {
        this.isLoadingResult$.next(false);
        this.hasError = true;
        this.errorText = err;
        return of([]);
      })
    );
    this.items$.subscribe();
  }

  sendId(id: string) {
    console.log(id);
  }
}
