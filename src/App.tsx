import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterCategory from "./components/FilterCategory"

function App() {

  const { state } = useBudget()
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="bg-green-600 py-8 max-h-72">        
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planifica tus Gastos
        </h1>
      </header>

      <div className="flex justify-center">
        <img className="w-4/12 my-8" src="/logo.svg" alt="Logo" />
      </div>

      <div className="max-w-sm md md:max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker/> : <BudgetForm/>}
      </div>

      {isValidBudget && ( // es como un if si es true
        <main className="max-w-sm md md:max-w-2xl mx-auto py-10">
          <FilterCategory/>
          <ExpenseList/>
          <ExpenseModal/>
        </main>
      )}

      <footer className="bg-green-600 p-4 text-center mt-16">
          <p className="text-2xl text-white">&copy; {currentYear} <a className="font-black" href="https://jordydev.website/" target="blank" rel="noopener noreferrer">JordyDev</a> | Todos los derechos reservados</p>
      </footer>
    </>
  )
}

export default App
