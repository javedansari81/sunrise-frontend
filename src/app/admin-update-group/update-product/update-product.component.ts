import { Component, OnInit } from '@angular/core'

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormArray,
} from '@angular/forms'
import { Router } from '@angular/router'
import { ProductService } from 'src/app/services/product.service'
import { AddProductComponent } from 'src/app/admin-add-group/add-product/add-product.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  banner: any = {
    pagetitle: 'Product',
    bg_image: 'assets/images/banner/bnr4.jpg',
    title: 'Product',
  }

  productData: any
  showProductForm = false
  isAdmin: boolean = false
  isEditMode = false
  productForm!: FormGroup
  selectedProduct: any

  images: string[] = []
  additionalImagesPreview: string[] = []
  videoPreview: string | ArrayBuffer | null = null
  videoError: string | null = null
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.productData = data
      console.log('cd', this.productData)
    })

    this.productForm = this.fb.group({
      title: ['', Validators.required],
      additionalImages: this.fb.array([]),
      availability: ['', Validators.required],
      category: ['', Validators.required],
      color: ['', Validators.required],
      currency: ['', Validators.required],
      deliveryTime: ['', Validators.required],
      description: ['', Validators.required],
      features: this.fb.array([]),
      img: [null],

      price: ['', [Validators.required, this.priceValidator]],
      priceDiscount: ['', this.priceValidator],
      rating: ['', this.ratingValidator],
      returnPolicy: [''],
      shipping_Cost: ['', [Validators.required, this.priceValidator]],
      size: this.fb.array([]),
      specifications: this.fb.group({
        dimensions: ['', Validators.required],
        material: ['', Validators.required],
        weight: ['', Validators.required],
      }),
      stock: ['', [Validators.required, this.numberValidator]],
      vendorContact: ['', [Validators.required, Validators.email]],
      vendorId: ['', Validators.required],
      vendorName: ['', Validators.required],
      video: ['', this.videoValidator],
      isActive: 1,
    })
  }

  openAddProductModel() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '600px',
      data: { mode: 'Add' },
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.ngOnInit() // Refresh the list after closing the dialog
      }
    })
  }

  openEditProductModel(data: any) {
    console.log('dt', data)

    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '600px',
      data: { mode: 'Edit', productDetail: data },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit() // Refresh the list after closing the dialog
      }
    })
  }
  handleDelete(id: any) {
    console.log('handledelete-', id)

    this.productService.deleteProduct(id)
    this.ngOnInit() // Refresh the list
  }
  closeModal() {}

  onSubmit() {
    if (this.productForm.invalid) {
      return
    }
    if (this.isEditMode) {
      this.productService
        .updateProduct(this.selectedProduct._id, this.productForm.value)
        .subscribe((response) => {
          // Handle success
          this.closeModal()
          this.ngOnInit() // Refresh the list
        })
    } else {
      this.productService
        .addProduct(this.productForm.value)
        .subscribe((response) => {
          // Handle success
          this.closeModal()
          this.ngOnInit() // Refresh the list
        })
    }
  }

  // Handle additional image file changes
  onAdditionalImagesChange(event: any) {
    const files = event.target.files
    // this.additionalImagesPreview = [] // Reset additional images preview
    console.log('adImage-change--', files)

    if (files && files.length) {
      // this.additionalImages.clear() // Clear form array
      for (let file of files) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
          this.additionalImagesPreview.push(e.target.result) // Preview additional image
        }
        reader.readAsDataURL(file)
        this.additionalImages.push(this.fb.control(file)) // Add file to form array
      }
    }
  }

  // // Handle single image file change
  onFileChange(event: any) {
    const file = event.target.files[0]
    console.log('main image-change--', file)

    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.images = [e.target.result] // Preview main Product image
        this.productForm.patchValue({ img: file }) // Set image file to form
      }
      reader.readAsDataURL(file)
    } else {
      this.images = []
      this.productForm.patchValue({ img: null })
    }
  }

  // Handle video file change

  onVideoChange(event: any) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.videoPreview = e.target.result // Set video preview
      }
      reader.readAsDataURL(file)

      // Update form control value and clear error
      this.productForm.patchValue({ video: file })
      this.videoError = null
    } else {
      this.videoPreview = null
      this.productForm.patchValue({ video: null })
      this.videoError = null
    }

    // Trigger validation manually
    this.productForm.get('video')?.updateValueAndValidity()
  }

  // Getters for FormArrays to easily manage adding/removing items
  get additionalImages(): FormArray {
    return this.productForm.get('additionalImages') as FormArray
  }

  get features(): FormArray {
    return this.productForm.get('features') as FormArray
  }

  get size(): FormArray {
    return this.productForm.get('size') as FormArray
  }

  // Methods to add/remove items from arrays
  addAdditionalImage() {
    this.additionalImages.push(this.fb.control('', Validators.required))
  }

  removeAdditionalImage(index: number) {
    this.additionalImages.removeAt(index)
    this.additionalImagesPreview.splice(index, 1) // Remove preview
  }

  addFeature() {
    this.features.push(this.fb.control('', Validators.required))
  }

  removeFeature(index: number) {
    this.features.removeAt(index)
  }

  addSize() {
    this.size.push(this.fb.control('', Validators.required))
  }

  removeSize(index: number) {
    this.size.removeAt(index)
  }
  numberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    if (value && isNaN(value)) {
      return { invalidNumber: true }
    }
    return null
  }
  // Validator for rating field
  ratingValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    const rating = parseFloat(value)
    if (value && (isNaN(rating) || rating < 0 || rating > 5)) {
      return { invalidRating: true }
    }
    return null
  }

  // Validator for price fields
  priceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    const regex = /^\d+(\.\d{1,2})?$/ // Match a number with up to 2 decimal places
    if (value && !regex.test(value)) {
      return { invalidPrice: true }
    }
    return null
  }

  // validator for video files
  videoValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value
    if (file) {
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg']
      const maxSize = 10 * 1024 * 1024 // 10 MB
      if (!validTypes.includes(file.type)) {
        return { invalidFileType: true }
      }
      if (file.size > maxSize) {
        return { invalidFileSize: true }
      }
    }
    return null
  }
}
