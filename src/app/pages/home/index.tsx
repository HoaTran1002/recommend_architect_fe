import CarouselCustomize from '@/app/_components/carousel/carouselCourse';
import CourseGridCustomize from '@/app/_components/grid/courseGrid';
import ListItem from '@/app/_components/list/courseCard.list';
import React from 'react';

export default function Home() {
  return (
    <div>
      <div>
        <span className='text-3xl font-bold hover:text-blue-600'>
          Lĩnh vực sẽ học tiếp theo
        </span>
        <CarouselCustomize/>
      </div>
      <div>
        <span className='text-3xl font-bold hover:text-blue-600'>
          Lĩnh vực sẽ học tiếp theo
        </span>
        <CourseGridCustomize/>
      </div>
      <div>
        <span className='text-3xl font-bold hover:text-blue-600'>
          Khóa học đề xuất cho bạn
        </span>
        <ListItem/>
      </div>

    </div>
)
}

