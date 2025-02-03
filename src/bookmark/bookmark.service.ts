import { Injectable } from '@nestjs/common';
import { BookMarkCreateDto, BookMarkEditDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    async getBookmarks(userId: string) {
        return this.prisma.bookmark.findMany({
            where: {
                userId
            }
        })
    }

    async getBookmarkById(userId: string, bookmarkId: string) {
        return this.prisma.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId
            }
        })
    }

    async createBookMark(userId: string, dto: BookMarkCreateDto) {
        return this.prisma.bookmark.create({
            data: {
                userId,
                ...dto
            }
        })
    }

    async updateBookmarkById(userId: string, bookmarkId: string, dto: BookMarkEditDto) {
        return this.prisma.bookmark.update({
            where: {
                id: bookmarkId,
                userId
            },
            data: {
                ...dto
            }
        })
    }

    deleteBookmarkById(userId: string, bookmarkId: string) {
        return this.prisma.bookmark.delete({
            where: {
                id: bookmarkId,
                userId
            }
        })
    }
}
