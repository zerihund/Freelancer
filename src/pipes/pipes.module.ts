import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { BidnumberPipe } from './bidnumber/bidnumber';
import { AcceptTitlePipe } from './accept-title/accept-title';
import { AvatarIdPipe } from './avatar-id/avatar-id';
@NgModule({
	declarations: [ThumbnailPipe,
    ThumbnailPipe,
    BidnumberPipe,
    AcceptTitlePipe,
    AvatarIdPipe],
	imports: [],
	exports: [ThumbnailPipe,
    ThumbnailPipe,
    BidnumberPipe,
    AcceptTitlePipe,
    AvatarIdPipe]
})
export class PipesModule {}
