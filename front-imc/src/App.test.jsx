import { render, fireEvent, waitFor } from '@testing-library/react'
import {screen} from '@testing-library/dom'
import App from './App'
import '@testing-library/jest-dom'


// Mock global fetch
beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    json: () =>
      Promise.resolve({
        imc: 22.5,
        avis: 'Normal',
      }),
  }) 
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('soumet le formulaire et affiche les résultats IMC', async () => {
    render(<App />)
  
    // Remplir les champs
    fireEvent.change(screen.getByLabelText(/votre taille/i), {
        target: { value: '1.80' },
    })
    fireEvent.change(screen.getByLabelText(/votre poids/i), {
        target: { value: '75' },
    })
    fireEvent.change(screen.getByLabelText(/votre nom/i), {
        target: { value: 'Steve' },
    })
    fireEvent.change(screen.getByLabelText(/votre email/i), {
        target: { value: 'steve@example.com' },
    })

    // Cliquer sur "Calculer"
    fireEvent.click(screen.getByRole('button', { name: /calculer/i }))
    expect(await screen.findByText('Ihre Größe')).toBeVisible()
    expect(await screen.findByText('Ihr Gewicht')).toBeVisible()
    
})
