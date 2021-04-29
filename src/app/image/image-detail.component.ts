import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Image } from './image';
import { ImageService } from './image.service';

@Component({
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit, OnDestroy { 
  public pageTitle = 'Image Detail';
  public loading: boolean = true;
  public blurForm: FormGroup;
  public maxBlur: number = 10;
  public blurArray: any[] = new Array(this.maxBlur + 1);
  public imageId: string;
  public hasError: boolean = false;
  public canDownloadImage: boolean = false;
  private _imageUrl: string;
  private _image: Image;
  private _blurDegree: string;
  private routeParamSubscription: Subscription;
  private imageSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private imageService: ImageService, 
              private route: ActivatedRoute) {}

  get image(): Image {
    return this._image;
  }

  set image(image: Image) {
    this._image = image;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  set imageUrl(imageUrl: string) {
    this._imageUrl = imageUrl;
  }

  get blurDegree(): string {
    return this._blurDegree;
  }

  set blurDegree(blurDegree: string) {
    this._blurDegree = blurDegree;
  }
  
  get pageNumber(): number {
    return this.imageService.currentPage;
  }

  get downloadButtonText(): string {
    return this.canDownloadImage ? 'Download' : 'Please wait...';
  }

  ngOnInit(): void {
    this.blurForm = this.fb.group({
      blurField: ['', [Validators.required]]
    });
    this.routeParamSubscription = this.route.paramMap.subscribe({
      next: params => {
        this.imageId = params.get('id');
        this.getImage(this.imageId);
        this.blurDegree = "0";
      },
      error: err => {
        console.error("Failed to get param", err);
        this.hasError = true;
      }
    })
  }

  getImage(id: string): void {
    this.imageSubscription = this.imageService.getImage(id).subscribe({
      next: image => {
        this.image = image;
        this.imageUrl = image.download_url;
        console.log("image", image);
      },
      error: err => {
        console.error("Error getting image", err);
        this.hasError = true;
      }
    })
  }

  blurPicture(): void {
    this.canDownloadImage = false;
    const blurDegree: string = this.blurForm.get('blurField').value;
    this.blurDegree = blurDegree;
    blurDegree === '0' ? this.imageUrl = this.image.download_url : this.imageUrl = this.image.download_url + `?blur=${blurDegree}`;
  }

  downloadUrl(url: string, fileName: string): void {
    const a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  }

  downloadImage(imageUrl: string): void {
    this.imageService.downloadImage(imageUrl).subscribe({
      next: val => {
        const url = URL.createObjectURL(val);
        this.downloadUrl(url, 'image');
        URL.revokeObjectURL(url);
      }
    })
  }

  onLoad(): void {
    this.loading = false;
    this.canDownloadImage = true;
  }

  ngOnDestroy(): void {
    this.routeParamSubscription.unsubscribe();
    this.imageSubscription.unsubscribe();
  }
}
