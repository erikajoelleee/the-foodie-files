import NewPostForm from '../../components/NewPostForm/NewPostForm';
import './NewPostPage.css';

export default function NewPostPage({ user, setUser }) {

  return (
    <>
      <main className="main-new-post">
        <h1 className="new-post-page-header">Create a post</h1>
        <hr />
        <NewPostForm user={user} />
      </main>
    </>
  );
}