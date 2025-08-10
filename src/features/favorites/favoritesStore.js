import { create } from "zustand";
import {persist } from 'zustand/middleware'
import {v4 as uuidv4} from 'uuid'

export const useFavoritesStore = create(
    persist(
        (set) => ({
            jokes : [],
            addJoke : (text) => 
                
                set((state) => ({
                    
                    jokes : [...state.jokes, {id:uuidv4(), text}],
                })),
                removeJoke : (id) => 
                    set((state) => ({
                        jokes : state.jokes.filter(joke => joke.id !== id),
                    })),
               
        }),
        {
            name:'favorite-jokes'
        }
    )
)