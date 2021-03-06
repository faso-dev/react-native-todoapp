import React, {useState} from "react";

/**
 * Un hook spécialisé pour gérer un compteur
 * @param {Number} initialValue
 * @param {Number} setep
 * @returns {[unknown, (function(): void)]}
 */
export default function (initialValue, setep) {

    const [counter, setCounter] = useState(initialValue)

    const increment = () => setCounter(counter => counter + setep)

    return [counter, increment]
}