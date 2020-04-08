import { Component, OnInit } from '@angular/core';
import { Page } from '../../models/Page';
import { PageService } from '../../services/page.service';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imageUrl:string = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';
  page:Page;
  constructor(private pg:PageService, private router: Router, private route: ActivatedRoute) { }
  pageNum:number = 1;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pageNum = parseInt(params.get('id'));
    });
    this.pg.getPage(this.pageNum).subscribe(page => {
      this.page = page;
    });
  }

  getImageUrl(num:number): string {
    return this.imageUrl + this.page.results[num].poster_path;
  }

  getPage(pageNum:number) {
    if(pageNum>0)
    {
      this.pageNum = pageNum;
      this.pg.getPage(this.pageNum).subscribe(page => {
        this.page = page;
      });
      this.router.navigate(['page',pageNum]);
      window.scrollTo(0, 0);
    }
  }

  getMovie(movieID:number) {
    this.router.navigate(['movie',movieID]);
  }
}
