import './styles.css'
import { Card } from '../../components/Card'
import React, { useState, useEffect } from 'react'

export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: '', avatar: '' })

  function handleAddStudent() {
    const newStundent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        seconds: '2-digit'
      })
    }
    // concatena o que já tinha com o novo elemento
    setStudents(prevState => [...prevState, newStundent])
  }

  // consumindo api do github
  useEffect(() => {
    fetch('https://api.github.com/users/rafaelrrb')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url
        })
      })
      .catch()
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença </h1>
        <div>
          <strong> {user.name} </strong>
          <img src={user.avatar} alt="Foto" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {students.map(student => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  )
}
