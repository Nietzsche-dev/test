import { Component, OnInit } from '@angular/core';
import {Article} from '../../models/article';
import {ArticleService} from '../../services/article.service';
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  btnClicked = false;
  favoriTeam = 'ASM';
  classement = ['ASM', 'Perpignan', 'Toulon'];
  articles: Article[];
  nbClick = 0;
  color: string;
  isLoading: boolean;
  faSpinner = faSpinner;

  constructor(private articleService: ArticleService) {
  }


  ngOnInit() {
    this.isLoading = true;
    this.articleService.getAllArticles().subscribe((data: Article[]) => {
      this.articles = data;
      this.isLoading = false;
    });
  }

  changeBtnClicked() {
    this.btnClicked = !this.btnClicked;
  }
  voteDashboard($event) {
    this.nbClick += 1;
  }

}
