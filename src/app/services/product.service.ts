import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, forkJoin, map, of, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'assets/data/product.json'
  private productDetailUrl = 'assets/data/product-detail.json'
  private backendUrl = 'http://localhost:5000/api'
  private apiUrl = 'http://localhost:5000/api/products'

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl)
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http
      .get<any[]>(this.productUrl)
      .pipe(
        map((products) =>
          products.filter(
            (product: { category: string }) => product.category === category,
          ),
        ),
      )
  }

  getProductDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.productDetailUrl)
  }

  getProductById(id: number): Observable<any> {
    return this.http
      .get<any[]>(this.productUrl)
      .pipe(
        map((products) => products.find((product) => product.productId === id)),
      )
  }

  getProductAndDetailsById(productId: number): Observable<any[]> {
    return forkJoin([this.getProducts(), this.getProductDetails()]).pipe(
      map(([products, productDetails]) => {
        const product = products.find(
          (t: { productId: number }) => t.productId === productId,
        )
        const details = productDetails.find((d) => d.productId === productId)
        return { ...product, ...details }
      }),
    )
  }

  // add product

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product)
  }

  // update product

  updateProduct(product_id: string, product: any): Observable<any> {
    console.log('pda', product_id, 'pd', product)

    return this.http
      .put<any>(`${this.apiUrl}/${product_id}`, product)
      .pipe(catchError(this.handleError))
  }

  deleteProduct(product_id: any): Observable<any> {
    console.log('csid', typeof product_id)

    return this.http
      .delete<any>(`${this.apiUrl}/${product_id}`)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error.message)
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`,
      )
    }
    // Return an observable with a user-facing error message
    return throwError(
      () => new Error('Something went wrong; please try again later.'),
    )
  }
}
