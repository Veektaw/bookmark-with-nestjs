import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { BookMarkCreateDto, BookMarkEditDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmark: BookmarkService) { }
    
    @Get()
    getBookmarks(@GetUser('id') userId: string) {
        return this.bookmark.getBookmarks(userId)
    }

    @Get(':id')
    getBookMark(@GetUser('id') userId: string, 
    @Param('id') bookmarkId: string
    ) {
        return this.bookmark.getBookmarkById(userId, bookmarkId)
    }

    @Post()
    createBookmark(@GetUser('id') userId: string,
    @Body() dto: BookMarkCreateDto
    ) {
        return this.bookmark.createBookMark(userId, dto)
    }

    @Patch(':id')
    editBookmark(@GetUser('id') userId: string,
    @Body() dto: BookMarkEditDto,
    @Param('id') bookmarkId: string
    ) {
        return this.bookmark.updateBookmarkById(userId, bookmarkId, dto)
    }

    @Delete(':id')
    deleteBookmark(@GetUser('id') userId: string,
    @Param('id') bookmarkId: string
    ) {
        return this.bookmark.deleteBookmarkById(userId, bookmarkId)
    }   

}
