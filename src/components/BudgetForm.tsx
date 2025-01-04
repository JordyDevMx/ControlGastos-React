import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget()

    // Input de ingresar el numero para presupuesto
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0 // si no hay nada o menor de 0 en el input
    }, [budget]) // cada vez que cambia budget

    // Al hacer clic al boton
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: 'add-budget', payload: {budget}})
    }

    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-green-600 font-bold text-center">
                    Definir Presupuesto
                </label>

                <input 
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    id="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>

            <input 
                type="submit"
                value='Definir Presupuesto'
                className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer w-full p-2 font-bold uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    )
}
