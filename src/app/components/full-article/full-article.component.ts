import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../services/article.service';
import {Article} from '../../models/article';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

@Component({
  selector: 'app-full-article',
  templateUrl: './full-article.component.html',
  styleUrls: ['./full-article.component.css']
})
export class FullArticleComponent implements OnInit {
  article: Article;
  isLoading: Boolean;
  faSpinner = faSpinner;
  constructor(private route: ActivatedRoute,
              private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    isLoading: true;
    this.articleService.getArticleById(+this.route.snapshot.paramMap.get('id')).subscribe((data: Article) => {
      this.article = data;
      this.isLoading = false;
    });
  }

  redirectHome() {
    this.router.navigate(['/home']);
  }

}
