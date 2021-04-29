import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ImageService } from "../../image/image.service";

@Injectable({
    providedIn: 'root'
})
export class PageNumberGuard implements CanActivate {
    constructor(private router: Router, private imageService: ImageService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (isNaN(+route.paramMap.get('pageNumber')) ||
            +route.paramMap.get('pageNumber') < 1 || 
            +route.paramMap.get('pageNumber') > this.imageService.numberOfPages) {
            this.router.navigate(['**']);
            return false;
        } 
        return true;
    }
}