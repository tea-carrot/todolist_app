export const TodoModel = item => {
  return {
    id: item.id, // 순서
    emoji: item.emoji, // 이모티콘
    title: item.title, // 제목
    categories: item.categories, // 카테고리
    date: item.date, // 날짜
    time: item.time, // 시간
    description: item.description, // 내용
    isImportant: item.isImportant, // 중요 여부
    isComplete: item.isComplete, // 완료 여부
  };
};
