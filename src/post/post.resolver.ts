import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ForbiddenException } from '@nestjs/common';

import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput, UpdatePostInput } from './dto';
import { CurrentUser, Public, UserAuth } from 'src/auth/decorators';
import { User } from 'src/users/entities';
import { CarService } from 'src/car/car.service';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly carService: CarService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => Post)
  @UserAuth()
  async createPost(
    @CurrentUser() user: User,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    const post = await this.postService.create(user.id);

    const car = await this.carService.create({
      ...createPostInput,
      id: post.id,
    });

    return { ...post, car };
  }

  // TODO Paginacion
  @Query(() => [Post], { name: 'posts' })
  @Public()
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  @UserAuth()
  async updatePost(
    @CurrentUser() user: User,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    const post = await this.postService.findOne(updatePostInput.id);
    if (post.userId !== user.id)
      throw new ForbiddenException('Cannot update the post', {
        cause: new Error(),
        description: 'This mutation only can be execute by the post owner',
      });

    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  @UserAuth()
  async removePost(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
  ) {
    const post = await this.postService.findOne(id);
    if (post.userId !== user.id)
      throw new ForbiddenException('Cannot delete the post', {
        cause: new Error(),
        description: 'This mutation only can be execute by the post owner',
      });
    await this.carService.remove(id);
    return this.postService.remove(id);
  }

  @ResolveField()
  async user(@Parent() post: Post) {
    const { userId } = post;
    return this.userService.findOne(userId);
  }

  @ResolveField()
  async car(@Parent() post: Post) {
    const { id } = post;
    return this.carService.findOne(id);
  }
}
