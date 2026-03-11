import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NoteForm from '../components/NoteForm.jsx'
import NoteItem from '../components/NoteItem.jsx'
import Spinner from '../components/Spinner'
import { getNotes, reset } from '../store/notes/noteSlice.js'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login', { replace: true })
      return
    }

    dispatch(getNotes())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <main className='dashboard'>
      <section className='dashboard-hero'>
        <div className='dashboard-hero-copy'>
          <span className='dashboard-eyebrow'>Dashboard</span>
          <h2>Welcome back, {user && user.name}</h2>
          <p>Your notes in one place.</p>
        </div>
        <div className='dashboard-stats'>
          <div className='stat-card'>
            <span className='stat-label'>Total notes</span>
            <strong>{notes.length}</strong>
          </div>
          <div className='stat-card'>
            <span className='stat-label'>Latest update</span>
            <strong>{notes[0] ? 'Saved' : 'No notes yet'}</strong>
          </div>
        </div>
      </section>

      <section className='dashboard-layout'>
        <aside className='dashboard-sidebar'>
          <NoteForm />
        </aside>

        <section className='dashboard-main'>
          <div className='section-heading'>
            <div>
              <span className='section-kicker'>Notes library</span>
              <h2>Your Notes</h2>
            </div>
            <p>{notes.length > 0 ? `${notes.length} saved` : 'Start with your first note'}</p>
          </div>

          {notes.length > 0 ? (
            <div className='notes-grid'>
              {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
              ))}
            </div>
          ) : (
            <div className='empty-state'>
              <h3>No notes yet</h3>
              <p>Create one from the panel on the left to get started.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default Dashboard
