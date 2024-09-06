import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { LightgalleryModule } from 'lightgallery/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { Slider1Component } from './elements/rev-slider/slider1/slider1.component'
import { Newsletter2Component } from './elements/newsletter/newsletter2/newsletter2.component'
import { Footer13Component } from './elements/footer/footer13/footer13.component'
import { Newsletter1Component } from './elements/newsletter/newsletter1/newsletter1.component'
import { Newsletter3Component } from './elements/newsletter/newsletter3/newsletter3.component'
import { Content1Component } from './elements/content-box/content1/content1.component'
import { Counter1Component } from './elements/counter/counter1/counter1.component'
import { Counter2Component } from './elements/counter/counter2/counter2.component'
import { Team1Component } from './elements/team/team1/team1.component'
import { Team2Component } from './elements/team/team2/team2.component'
import { Team3Component } from './elements/team/team3/team3.component'
import { Testimonial1Component } from './elements/testimonial/testimonial1/testimonial1.component'
import { Testimonial2Component } from './elements/testimonial/testimonial2/testimonial2.component'
import { Testimonial3Component } from './elements/testimonial/testimonial3/testimonial3.component'
import { Testimonial4Component } from './elements/testimonial/testimonial4/testimonial4.component'
import { Blog1Component } from './elements/blog/blog1/blog1.component'
import { Blog2Component } from './elements/blog/blog2/blog2.component'
import { Blog3Component } from './elements/blog/blog3/blog3.component'
import { Client1Component } from './elements/client/client1/client1.component'
import { Courses1Component } from './elements/courses/courses1/courses1.component'
import { Courses2Component } from './elements/courses/courses2/courses2.component'
import { ContactUs1Component } from './pages/contact-us1/contact-us1.component'
import { ContactUs2Component } from './pages/contact-us2/contact-us2.component'
import { ContactUs3Component } from './pages/contact-us3/contact-us3.component'
import { ContactUs4Component } from './pages/contact-us4/contact-us4.component'
import { Banner1Component } from './elements/banners/banner1/banner1.component'
import { Banner3Component } from './elements/banners/banner3/banner3.component'
import { Banner5Component } from './elements/banners/banner5/banner5.component'
import { SingleComponent } from './blog/single/single.component'
import { SearchForm3Component } from './elements/forms/search-form3/search-form3.component'
import { RecentPosts1Component } from './elements/widgets/recent-posts1/recent-posts1.component'
import { OurGallery1Component } from './elements/widgets/our-gallery1/our-gallery1.component'
import { CategoryList1Component } from './elements/widgets/category-list1/category-list1.component'
import { TagList1Component } from './elements/widgets/tag-list1/tag-list1.component'
import { Comments1Component } from './elements/comments/comments1/comments1.component'
import { CommentForm1Component } from './elements/forms/comment-form1/comment-form1.component'

import { HeaderStyle3Component } from './features/header-style3/header-style3.component'
import { HeaderStyle4Component } from './features/header-style4/header-style4.component'

import { HeaderStyle6Component } from './features/header-style6/header-style6.component'

import { HeaderLight7Component } from './elements/header/header-light7/header-light7.component'

import { FooterStyle1Component } from './features/footer-style1/footer-style1.component'
import { FooterStyle2Component } from './features/footer-style2/footer-style2.component'
import { FooterStyle3Component } from './features/footer-style3/footer-style3.component'
import { FooterStyle4Component } from './features/footer-style4/footer-style4.component'
import { FooterStyle5Component } from './features/footer-style5/footer-style5.component'
import { FooterStyle6Component } from './features/footer-style6/footer-style6.component'
import { FooterStyle7Component } from './features/footer-style7/footer-style7.component'
import { FooterStyle8Component } from './features/footer-style8/footer-style8.component'
import { FooterStyle9Component } from './features/footer-style9/footer-style9.component'
import { FooterStyle10Component } from './features/footer-style10/footer-style10.component'
import { FooterStyle11Component } from './features/footer-style11/footer-style11.component'
import { FooterStyle12Component } from './features/footer-style12/footer-style12.component'
import { Footer1Component } from './elements/footer/footer1/footer1.component'
import { Footer2Component } from './elements/footer/footer2/footer2.component'
import { Footer3Component } from './elements/footer/footer3/footer3.component'
import { Footer4Component } from './elements/footer/footer4/footer4.component'
import { Footer5Component } from './elements/footer/footer5/footer5.component'
import { Footer6Component } from './elements/footer/footer6/footer6.component'
import { Footer7Component } from './elements/footer/footer7/footer7.component'
import { Footer8Component } from './elements/footer/footer8/footer8.component'
import { Footer9Component } from './elements/footer/footer9/footer9.component'
import { Footer10Component } from './elements/footer/footer10/footer10.component'
import { Footer11Component } from './elements/footer/footer11/footer11.component'
import { Footer12Component } from './elements/footer/footer12/footer12.component'
import { Footer14Component } from './elements/footer/footer14/footer14.component'
import { AboutUs1Component } from './pages/about-us1/about-us1.component'
import { AboutUs2Component } from './pages/about-us2/about-us2.component'
import { Services1Component } from './academics/school-services/services1/services1.component'
import { Services2Component } from './academics/school-services/services2/services2.component'
import { FaqsComponent } from './academics/school-services/faqs/faqs.component'
import { Content11Component } from './elements/content-box/content11/content11.component'
import { Content2Component } from './elements/content-box/content2/content2.component'
import { Content3Component } from './elements/content-box/content3/content3.component'
import { Content4Component } from './elements/content-box/content4/content4.component'
import { Content5Component } from './elements/content-box/content5/content5.component'
import { Content6Component } from './elements/content-box/content6/content6.component'
import { Content7Component } from './elements/content-box/content7/content7.component'
import { Content8Component } from './elements/content-box/content8/content8.component'
import { Content9Component } from './elements/content-box/content9/content9.component'
import { Content10Component } from './elements/content-box/content10/content10.component'
import { Content12Component } from './elements/content-box/content12/content12.component'
import { Content13Component } from './elements/content-box/content13/content13.component'
import { Content14Component } from './elements/content-box/content14/content14.component'
import { Content15Component } from './elements/content-box/content15/content15.component'
import { Content16Component } from './elements/content-box/content16/content16.component'
import { ServicesElement1Component } from './elements/services/services-element1/services-element1.component'
import { QueryFormComponent } from './elements/forms/query-form/query-form.component'
import { Accordian1Component } from './elements/accordians/accordian1/accordian1.component'
import { TeachersComponent } from './academics/teachers-courses/teachers/teachers.component'
import { TeachersProfileComponent } from './academics/teachers-courses/teachers-profile/teachers-profile.component'
import { ClassesComponent } from './academics/teachers-courses/classes/classes.component'
import { classesDetailsComponent } from './academics/teachers-courses/classes-details/classes-details.component'
import { EventsComponent } from './academics/events-recognitions/events/events.component'
import { EventsDetailsComponent } from './academics/events-recognitions/events-details/events-details.component'
import { HelpDeskComponent } from './academics/school-services/help-desk/help-desk.component'
import { PrivacyPolicyComponent } from './academics/school-services/privacy-policy/privacy-policy.component'
import { Error404Component } from './pages/error404/error404.component'
import { Error405Component } from './pages/error405/error405.component'
import { GalleryGrid2Component } from './academics/gallery/gallery-grid2/gallery-grid2.component'
import { GalleryGrid3Component } from './academics/gallery/gallery-grid3/gallery-grid3.component'
import { GalleryGrid4Component } from './academics/gallery/gallery-grid4/gallery-grid4.component'
import { SearchForm4Component } from './elements/forms/search-form4/search-form4.component'
import { SearchForm1Component } from './elements/forms/search-form1/search-form1.component'
import { SearchForm2Component } from './elements/forms/search-form2/search-form2.component'
import { RegistrationForm1Component } from './elements/forms/registration-form1/registration-form1.component'
import { RegistrationForm2Component } from './elements/forms/registration-form2/registration-form2.component'
import { Gallery1Component } from './elements/gallery/gallery1/gallery1.component'
import { Gallery2Component } from './elements/gallery/gallery2/gallery2.component'
import { Gallery3Component } from './elements/gallery/gallery3/gallery3.component'
import { Gallery4Component } from './elements/gallery/gallery4/gallery4.component'
import { ShopComponent } from './shop/shop/shop.component'
import { ShopSidebarComponent } from './shop/shop-sidebar/shop-sidebar.component'
import { CartComponent } from './shop/cart/cart.component'
import { CheckoutComponent } from './shop/checkout/checkout.component'
import { LoginComponent } from './shop/login/login.component'
import { ProductDetailsComponent } from './shop/product-details/product-details.component'
import { RegisterComponent } from './shop/register/register.component'
import { WishlistComponent } from './shop/wishlist/wishlist.component'
import { IconBox4Component } from './elements/icon-box/icon-box4/icon-box4.component'
import { IconBox1Component } from './elements/icon-box/icon-box1/icon-box1.component'
import { IconBox2Component } from './elements/icon-box/icon-box2/icon-box2.component'
import { IconBox3Component } from './elements/icon-box/icon-box3/icon-box3.component'
import { OwlSlider1Component } from './elements/sliders/owl-slider1/owl-slider1.component'
import { Grid2Component } from './blog/grid2/grid2.component'
import { Grid2SidebarComponent } from './blog/grid2-sidebar/grid2-sidebar.component'
import { Grid2SidebarLeftComponent } from './blog/grid2-sidebar-left/grid2-sidebar-left.component'
import { Grid3Component } from './blog/grid3/grid3.component'
import { Grid3SidebarComponent } from './blog/grid3-sidebar/grid3-sidebar.component'
import { Grid3SidebarLeftComponent } from './blog/grid3-sidebar-left/grid3-sidebar-left.component'
import { Grid4Component } from './blog/grid4/grid4.component'
import { HalfImageComponent } from './blog/half-image/half-image.component'
import { HalfImageSidebarComponent } from './blog/half-image-sidebar/half-image-sidebar.component'
import { HalfImageSidebarLeftComponent } from './blog/half-image-sidebar-left/half-image-sidebar-left.component'
import { LargeImageComponent } from './blog/large-image/large-image.component'
import { LargeImageSidebarComponent } from './blog/large-image-sidebar/large-image-sidebar.component'
import { LargeImageSidebarLeftComponent } from './blog/large-image-sidebar-left/large-image-sidebar-left.component'
import { SingleSidebarComponent } from './blog/single-sidebar/single-sidebar.component'
import { SingleSidebarLeftComponent } from './blog/single-sidebar-left/single-sidebar-left.component'

import { Slider2Component } from './elements/rev-slider/slider2/slider2.component'
import { Slider3Component } from './elements/rev-slider/slider3/slider3.component'
import { Slider4Component } from './elements/rev-slider/slider4/slider4.component'
import { Slider5Component } from './elements/rev-slider/slider5/slider5.component'
import { Slider6Component } from './elements/rev-slider/slider6/slider6.component'

import { HomeSchoolComponent } from './home-school/home-school.component'

import { CallToAction1Component } from './elements/call-to-action/call-to-action1/call-to-action1.component'
import { CallToAction2Component } from './elements/call-to-action/call-to-action2/call-to-action2.component'
import { CallToAction3Component } from './elements/call-to-action/call-to-action3/call-to-action3.component'
import { Courses3Component } from './elements/courses/courses3/courses3.component'
import { Courses4Component } from './elements/courses/courses4/courses4.component'
import { Courses5Component } from './elements/courses/courses5/courses5.component'
import { Events1Component } from './elements/events/events1/events1.component'
import { Events2Component } from './elements/events/events2/events2.component'
import { Events3Component } from './elements/events/events3/events3.component'
import { PriceTable1Component } from './elements/price_table/price-table1/price-table1.component'
import { PriceTable2Component } from './elements/price_table/price-table2/price-table2.component'
import { BlogStyle1Component } from './elements/blog/blog-style1/blog-style1.component'
import { ScroltopComponent } from './elements/scroltop/scroltop.component'
import { BlogStyle2Component } from './elements/blog/blog-style2/blog-style2.component'
import { BlogStyleImageComponent } from './elements/blog/blog-style-image/blog-style-image.component'
import { Gallery5Component } from './elements/gallery/gallery5/gallery5.component'
import { Gallery6Component } from './elements/gallery/gallery6/gallery6.component'
import { Courses6Component } from './elements/courses/courses6/courses6.component'
import { LightgalleryComponent } from './elements/widgets/lightgallery/lightgallery.component'
import { PrincipalMessageComponent } from './about-us/principal-message/principal-message.component'
import { HttpClientModule } from '@angular/common/http'
import { AboutSunriseComponent } from './about-us/about-sunrise/about-sunrise.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AddProductComponent } from './admin-add-group/add-product/add-product.component'
import { AddTeacherComponent } from './admin-add-group/add-teacher/add-teacher.component'
import { AddEventComponent } from './admin-add-group/add-event/add-event.component'
import { AddClassComponent } from './admin-add-group/add-class/add-class.component'
import { AddServiceComponent } from './admin-add-group/add-service/add-service.component'
import { AddTestimonialsComponent } from './admin-add-group/add-testimonials/add-testimonials.component'
import { SuccessDialogComponent } from './util/success-dialog/success-dialog.component'
import { MatDialogModule } from '@angular/material/dialog'
import { UpdateTeacherComponent } from './admin-update-group/update-teacher/update-teacher.component'
import { UpdateEventComponent } from './admin-update-group/update-event/update-event.component'
import { UpdateClassComponent } from './admin-update-group/update-class/update-class.component'
import { UpdateTestimonialsComponent } from './admin-update-group/update-testimonials/update-testimonials.component'
import { UpdateServiceComponent } from './admin-update-group/update-service/update-service.component'
import { UpdateProductComponent } from './admin-update-group/update-product/update-product.component'
@NgModule({
  declarations: [
    AppComponent,

    Slider1Component,
    Newsletter2Component,
    Footer13Component,
    Newsletter1Component,
    Newsletter3Component,
    Content1Component,
    Counter1Component,
    Counter2Component,
    Team1Component,
    Team2Component,
    Team3Component,
    Testimonial1Component,
    Testimonial2Component,
    Testimonial3Component,
    Testimonial4Component,
    Blog1Component,
    Blog2Component,
    Blog3Component,
    Client1Component,
    Courses1Component,
    Courses2Component,
    ContactUs1Component,
    ContactUs2Component,
    ContactUs3Component,
    ContactUs4Component,
    Banner1Component,
    Banner3Component,
    Banner5Component,
    SingleComponent,
    SearchForm3Component,
    RecentPosts1Component,
    OurGallery1Component,
    CategoryList1Component,
    TagList1Component,
    Comments1Component,
    CommentForm1Component,

    HeaderStyle3Component,
    HeaderStyle4Component,

    HeaderStyle6Component,

    HeaderLight7Component,

    FooterStyle1Component,
    FooterStyle2Component,
    FooterStyle3Component,
    FooterStyle4Component,
    FooterStyle5Component,
    FooterStyle6Component,
    FooterStyle7Component,
    FooterStyle8Component,
    FooterStyle9Component,
    FooterStyle10Component,
    FooterStyle11Component,
    FooterStyle12Component,
    Footer1Component,
    Footer2Component,
    Footer3Component,
    Footer4Component,
    Footer5Component,
    Footer6Component,
    Footer7Component,
    Footer8Component,
    Footer9Component,
    Footer10Component,
    Footer11Component,
    Footer12Component,
    Footer14Component,
    AboutUs1Component,
    AboutUs2Component,
    Services1Component,
    Services2Component,
    FaqsComponent,
    Content11Component,
    Content2Component,
    Content3Component,
    Content4Component,
    Content5Component,
    Content6Component,
    Content7Component,
    Content8Component,
    Content9Component,
    Content10Component,
    Content12Component,
    Content13Component,
    Content14Component,
    Content15Component,
    Content16Component,
    ServicesElement1Component,
    QueryFormComponent,
    Accordian1Component,
    TeachersComponent,
    TeachersProfileComponent,
    ClassesComponent,
    classesDetailsComponent,
    EventsComponent,
    EventsDetailsComponent,
    HelpDeskComponent,
    PrivacyPolicyComponent,
    Error404Component,
    Error405Component,
    GalleryGrid2Component,
    GalleryGrid3Component,
    GalleryGrid4Component,
    SearchForm4Component,
    SearchForm1Component,
    SearchForm2Component,
    RegistrationForm1Component,
    RegistrationForm2Component,
    Gallery1Component,
    Gallery2Component,
    Gallery3Component,
    Gallery4Component,
    ShopComponent,
    ShopSidebarComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    ProductDetailsComponent,
    RegisterComponent,
    WishlistComponent,
    IconBox4Component,
    IconBox1Component,
    IconBox2Component,
    IconBox3Component,
    OwlSlider1Component,
    Grid2Component,
    Grid2SidebarComponent,
    Grid2SidebarLeftComponent,
    Grid3Component,
    Grid3SidebarComponent,
    Grid3SidebarLeftComponent,
    Grid4Component,
    HalfImageComponent,
    HalfImageSidebarComponent,
    HalfImageSidebarLeftComponent,
    LargeImageComponent,
    LargeImageSidebarComponent,
    LargeImageSidebarLeftComponent,
    SingleSidebarComponent,
    SingleSidebarLeftComponent,
    Slider2Component,
    Slider3Component,
    Slider4Component,
    Slider5Component,
    Slider6Component,
    HomeSchoolComponent,

    CallToAction1Component,
    CallToAction2Component,
    CallToAction3Component,
    Courses3Component,
    Courses4Component,
    Courses5Component,
    Events1Component,
    Events2Component,
    Events3Component,
    PriceTable1Component,
    PriceTable2Component,
    BlogStyle1Component,
    ScroltopComponent,
    BlogStyle2Component,
    BlogStyleImageComponent,
    Gallery5Component,
    Gallery6Component,
    Courses6Component,
    LightgalleryComponent,
    PrincipalMessageComponent,
    AboutSunriseComponent,
    AddProductComponent,

    AddTeacherComponent,
    AddEventComponent,
    AddClassComponent,
    AddServiceComponent,
    AddTestimonialsComponent,
    SuccessDialogComponent,
    UpdateTeacherComponent,
    UpdateEventComponent,
    UpdateClassComponent,
    UpdateTestimonialsComponent,
    UpdateServiceComponent,
    UpdateProductComponent,
  ],
  imports: [
    BrowserModule,
    LightgalleryModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
  bootstrap: [AppComponent],
})
export class AppModule {}
