import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Image } from "./image";

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    public currentPage: number = 1;
    public numberOfPages: number = 4;
    public pictureLimitPerPage: number = 30;
    public pageArray = new Array(this.numberOfPages);

    constructor(private http: HttpClient) { }

    private getImageUrl(id: string): string {
        return `https://picsum.photos/id/${id}/info`;
    }

    private getImagesUrl(pageNumber: number): string {
        return `https://picsum.photos/v2/list?page=${pageNumber}&limit=${this.pictureLimitPerPage}`
    }

    public getImage(id: string): Observable<Image> {
        return this.http.get<Image>(this.getImageUrl(id)).pipe(take(1));
    }

    public getImages(): Observable<Image[]> {
        return this.http.get<Image[]>(this.getImagesUrl(this.currentPage)).pipe(take(1));
    }

    public changePage(pageNumber: number): void {
        this.currentPage = pageNumber;
    }

    public downloadImage(imageUrl: string): Observable<any> {
        return this.http.get(imageUrl, { responseType: 'blob' });
    }
}