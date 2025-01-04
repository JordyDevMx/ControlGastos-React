import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"

export default function ExpenseList() {
    const { state } = useBudget()
    
    const filterExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
    const isEmpty = useMemo(() => filterExpenses.length === 0, [filterExpenses])
    
    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay Gastos</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                    <p className="flex items-center gap-4 italic">
                        Para editar deslizar a la derecha 
                        <span className="text-blue-500 font-bold text-2xl">
                            <FaArrowRightLong/>
                        </span>
                    </p>
                    <p className="flex items-center gap-4 italic">
                        Para eliminar deslizar a la Izquierda 
                        <span className="text-red-600 font-bold text-2xl">
                        <FaArrowLeftLong/>
                        </span>
                    </p>
                    {filterExpenses.map( expense => (
                        <ExpenseDetail
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </div>
    )
}
