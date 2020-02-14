import { Injectable } from '@angular/core';
import {Article} from '../models/article';
import {Observable, throwError} from 'rxjs/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: Article[];
  apiUrl = 'http://localhost:3000/article';
  httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
  };
  constructor(private httpClient: HttpClient) {
  }

  
  getAllArticles(): Observable<Article[]> {
    
    return this.httpClient.get<Article[]>(this.apiUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );

  }

  getArticleById(id: number): Observable<Article> {
    return this.httpClient.get<Article>(this.apiUrl + '/' + id).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  add(article: Article): Observable<Article> {
    article.dateCreate = new Date();
    return this.httpClient.post<Article>(this.apiUrl,article,this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  edit(articleToEdit: Article): void {
    this.articles
      .filter(
        article => article.id === articleToEdit.id)[0] = articleToEdit;
  }

  deleteArticle(article: Article): Article[] {
    this.articles = this.articles
      .filter(articleToDelete =>
        articleToDelete !== article);
    return this.articles;
  }

 
  handleError(error) {
    let errorMessage = '';
    if ( error.error instanceof ErrorEvent ) {
     
      errorMessage = error.error.message;
    } else {
      
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
