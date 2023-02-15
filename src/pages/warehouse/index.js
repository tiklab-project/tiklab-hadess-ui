/**
 * @name: Index
 * @author: limingliang
 * @date: 2023-01-03 11:04
 * @description：代理信息
 * @update: 2023-01-03 11:04
 */
import React, {useState, useEffect} from "react";
const Index = () => {

    useEffect(async () => {
        await findRepository()
    }, []);

    const findRepository = () => {
    }
    return(
        <div>

        </div>
    )
}

export default Index