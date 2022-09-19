import React from 'react';
import '@css/Main/ArticleCreate.css';
import { getAuth } from '@cert/AuthStorage';
import { AuthStorageType } from '@globalObj/types';
import { useState } from 'react';
import axios from 'axios';

const ArticleCreate = () => {
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [categoryId, setCategoryId] = useState(0);

  const onClickSubmit = () => {
    if (getAuth()) {
      axios
        .post(`http://${process.env.IP_ADDRESS}/board/write.php`, {
          title: articleTitle,
          content: articleContent,
          categoryId,
          userId: (getAuth() as AuthStorageType)['userId'],
          loginId: (getAuth() as AuthStorageType)['loginId'],
        })
        .then((res) => {
          alert('게시글이 생성되었습니다.');
          location.reload();
          console.log(res);
        })
        .catch((error) => {
          alert(error.response.data);
          console.log(error);
        });
    }
  };

  return (
    <div className="article_create">
      <div className="article_create-header">
        <p className="font-25">당신의 생각을 들려주세요</p>
        <p>{(getAuth() as AuthStorageType)['loginId']}님 Squares에서 최고의 팀원들과 함께하세요.</p>
      </div>
      <div className="article_create-title">
        <p className="font-18">제목</p>
        <textarea
          className={`article_create-title_textarea`}
          onChange={(e) => setArticleTitle(e.target.value)}
          cols={50}
          placeholder="제목을 입력해주세요"
        />
      </div>
      <div className="article_create-category">
        <p className="font-18">카테고리</p>
        <form>
          <select onChange={(e) => setCategoryId(parseInt(e.target.value, 10))}>
            <option value={0}>EDITOR'S CHOICE</option>
            <option value={1}>WEEKLY BEST</option>
            <option value={2}>Q&A</option>
            <option value={3}>KNOWLEDGE</option>
          </select>
        </form>
      </div>
      <div className="article_create-content">
        <p className="font-18">상세정보</p>
        <textarea
          className={`article_create-content_textarea`}
          onChange={(e) => setArticleContent(e.target.value)}
          rows={10}
          placeholder="내용을 입력해주세요"
        />
      </div>
      <div className="flex_horizontal_end">
        <div className="article_create-create_btn flex_vertical_middle button" onClick={onClickSubmit}>
          게시글 생성
        </div>
      </div>
    </div>
  );
};

export default ArticleCreate;
