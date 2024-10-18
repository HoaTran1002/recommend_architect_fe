import ListItem from "@/app/_components/list/courseCard.list";

export default function HomePage(){
    return (
      <div>
        <span className='text-3xl font-bold hover:text-blue-600'>
          Khóa học đề xuất cho bạn
        </span>
        <ListItem/>
      </div>
      );
}