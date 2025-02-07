import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

const data = [
    {
        post_id: 1,
        comment: '이 게시글은 정말 유용합니다!',
        title: 'React 소개',
        likes: 120,
        user_id: 101,
        img: 'https://example.com/img/react_intro.jpg',
        view: 500,
        is_activated: true,
    },
    {
        post_id: 2,
        comment: '이해가 잘 되지 않았어요, 조금 더 자세히 설명해주세요.',
        title: 'JavaScript 기본 문법',
        likes: 45,
        user_id: 102,
        img: 'https://example.com/img/js_syntax.jpg',
        view: 300,
        is_activated: true,
    },
    {
        post_id: 3,
        comment: '이 글을 통해 많은 것을 배웠어요! 감사합니다.',
        title: 'Node.js 설치 방법',
        likes: 78,
        user_id: 103,
        img: 'https://example.com/img/nodejs_install.jpg',
        view: 650,
        is_activated: false,
    },
    {
        post_id: 4,
        comment: '이 글을 참고해서 프로젝트를 성공적으로 마쳤습니다!',
        title: '배포를 위한 Git과 GitHub 활용',
        likes: 200,
        user_id: 104,
        img: 'https://example.com/img/git_deployment.jpg',
        view: 1000,
        is_activated: true,
    },
    {
        post_id: 5,
        comment: '많은 도움이 되었습니다! 계속해서 좋은 글 부탁드립니다.',
        title: '최신 웹 디자인 트렌드 2025',
        likes: 56,
        user_id: 105,
        img: 'https://example.com/img/web_design_2025.jpg',
        view: 450,
        is_activated: true,
    },
];

// 동적 columns 생성
const columns: ColumnDef<unknown>[] = Object.keys(data[0]).map(key => {
    return {
        accessorKey: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
        cell: ({ row }) => {
            const value = row.getValue(key);

            if (typeof value === 'boolean') {
                // boolean 값일 경우 체크박스로 출력
                return <div>{value ? 'Active' : 'Inactive'}</div>;
            }

            if (typeof value === 'number') {
                // 숫자일 경우 포맷
                return <div>{new Intl.NumberFormat().format(value)}</div>;
            }

            // 기본적으로 문자열 출력
            return <div>{value as React.ReactNode}</div>;
        },
    };
});

// `columns`가 동적으로 만들어졌습니다.
export { columns };
