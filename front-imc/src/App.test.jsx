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
    fireEvent.change(screen.getByLabelText(/ihre größe"/i), {
        target: { value: '1.80' },
    })
    fireEvent.change(screen.getByLabelText(/ihr gewicht/i), {
        target: { value: '75' },
    })
    fireEvent.change(screen.getByLabelText(/ihr name/i), {
        target: { value: 'Achille' },
    })
    fireEvent.change(screen.getByLabelText(/ihre e-mail/i), {
        target: { value: 'achille@example.com' },
    })

    // Cliquer sur "Calculer"
    fireEvent.click(screen.getByRole('button', { name: /calculer/i }))
    expect(await screen.findByText('Ihre Größe')).toBeVisible()
    expect(await screen.findByText('Ihr Gewicht')).toBeVisible()
    
})
