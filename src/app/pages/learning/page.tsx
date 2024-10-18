import CourseGridCustomize from "@/app/_components/grid/courseGrid";

export default function LearningPage(){
    return (
        <div>
        <span className='text-3xl font-bold hover:text-blue-600'>
          Các khóa học của tôi 
        </span>
        <CourseGridCustomize/>
      </div>
      );
}