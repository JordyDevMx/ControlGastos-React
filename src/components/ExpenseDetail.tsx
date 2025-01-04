import { useMemo } from "react"
// La edicion de eliminar y editar npm install react-swipeable-list y npm install prop-types
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'

import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import "react-swipeable-list/dist/styles.css"
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({expense} : ExpenseDetailProps) {
    const { dispatch } = useBudget()

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'get-expense-id', payload: {id: expense.id}})}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}})}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={10}
                leadingActions={leadingActions()} // Lado Izquierdo
                trailingActions={trailingActions()} // Lado Derecho
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex flex-col md:flex-row gap-5 items-center">
                    <div>
                        <img 
                            src={`/icono_${categoryInfo.icon}.svg`} 
                            alt="Icono Gasto"
                            className="w-28" 
                        />
                    </div>

                    <div className="flex-1 space-y-2 text-center">
                        <p className="text-2xl font-bold">{expense.expenseName}</p>
                        <p className="text-sm font-bold uppercase text-green-600">{categoryInfo.name}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
