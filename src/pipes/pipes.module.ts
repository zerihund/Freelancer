import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
@NgModule({
	declarations: [ThumbnailPipe,
    ThumbnailPipe],
	imports: [],
	exports: [ThumbnailPipe,
    ThumbnailPipe]
})
export class PipesModule {}
