import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Image } from '../image/image';
import { ImageService } from '../image/image.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy { 
  public pageTitle = 'Home Page';
  public loading: boolean = true;
  public hasError: boolean = false;
  private _images: Image[];
  private imagesLoaded: number = 0;
  private routeParamSubscription: Subscription;
  private imageListSubscription: Subscription;

  constructor(private imageService: ImageService, 
              private route: ActivatedRoute,
              private router: Router) {}

  get images(): Image[] {
    return this._images;
  }

  set images(images: Image[]) {
    this._images = images;
  }

  get currentPage(): number {
    return this.imageService.currentPage;
  }

  get pageArray(): any[] {
    return this.imageService.pageArray;
  }

  ngOnInit(): void {
    this.routeParamSubscription = this.route.paramMap.subscribe({
      next: params => {
        const pageNumber: number = +params.get('pageNumber');
        this.changePage(pageNumber);
      },
      error: err => {
        console.error("Failed to get param", err);
        this.hasError = true;
      }
    })
  }

  getImages(): void {
    this.imageListSubscription = this.imageService.getImages().subscribe({
      next: images => {
        this.images = images;
        console.log(this.images);
      }, 
      error: err => {
        console.error("Failed to get images", err);
        this.hasError = true;
      }
    })
  }

  onLoad(): void {
    this.imagesLoaded++;
    if (this.imagesLoaded >= this.imageService.pictureLimitPerPage) {
      this.loading = false;
    }
  }

  changePage(pageNumber: number): void {
    if (!(pageNumber < 1 || pageNumber > this.imageService.numberOfPages)) {
      this.imagesLoaded = 0;
      this.loading = true;
      this.imageService.changePage(pageNumber);
      this.getImages();
    }
  }

  goToNextPage(pageNumber: number): void {
    if (!(pageNumber < 1 || pageNumber > this.imageService.numberOfPages)) {
      this.router.navigate([`/page/${pageNumber}`]);
    }
  }

  ngOnDestroy(): void {
    this.routeParamSubscription.unsubscribe();
    this.imageListSubscription.unsubscribe();
  }
}
