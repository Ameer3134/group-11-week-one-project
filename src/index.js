//////////////////


fetchAdvice ()

async function fetchAdvice () {
    
        try {

            const response = await fetch ('https://api.adviceslip.com/advice')

            if(!response.ok) {

                        throw new Error ('could not fetch response')
            }


            const data = await response.json()
            console.log(data)
            
        } 


        
        catch(error) {
                console.error(error)
        }


}

// fetch ('https://api.adviceslip.com/advice')





