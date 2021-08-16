import React from 'react';

export const TodoState = React.createContext(null);

export const initialState = {
  todos: [
    {
      id: 0,
      emoji: '🍴',
      title: '아침 메뉴 정하기',
      categories: '🍴🍨',
      date: '07-01',
      time: '12:00',
      description: '오늘 친구와 만나서 점심 메뉴를 골라야한다.',
      isImportant: false,
      isComplete: false,
    },
    {
      id: 1,
      emoji: '🍨',
      title: '점심 메뉴 정하기',
      categories: '🍴🍨',
      date: '07-01',
      time: '12:00',
      description: '오늘 친구와 만나서 점심 메뉴를 골라야한다.',
      isImportant: true,
      isComplete: true,
    },
    {
      id: 2,
      emoji: '🍙',
      title: '저녁 메뉴 정하기',
      categories: '🍴🍨',
      date: '07-01',
      time: '12:00',
      description: '오늘 친구와 만나서 점심 메뉴를 골라야한다.',
      isImportant: true,
      isComplete: false,
    },
  ],

  categories: [
    {id: 0, emoji: '🍴', title: '식사'},
    {id: 1, emoji: '🍨', title: '간식'},
    {id: 2, emoji: '🍙', title: '비상용'},
  ],
};
