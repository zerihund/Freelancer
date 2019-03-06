import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { BidnumberPipe } from './bidnumber/bidnumber';
@NgModule({
	declarations: [ThumbnailPipe,
    ThumbnailPipe,
    BidnumberPipe],
	imports: [],
	exports: [ThumbnailPipe,
    ThumbnailPipe,
    BidnumberPipe]
})
export class PipesModule {}
