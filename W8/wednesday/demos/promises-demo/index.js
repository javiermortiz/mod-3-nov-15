// V1 doesn't work
function openingCrawlBroken(time) {
    setTimeout(() => {
        console.log(`It is a period of civil war.
                     Rebel spaceships, striking
                     from a hidden base, have won
                     their first victory against
                     the evil Galactic Empire.`);
    }, time);
    setTimeout(() => {
        console.log(`During the battle, Rebel
                         spies managed to steal secret
                         plans to the Empire's
                         ultimate weapon, the DEATH
                         STAR, an armored space
                         station with enough power to
                         destroy an entire planet.`);
        
    }, time);
    setTimeout(() => {
        console.log(`Pursued by the Empire's
                             sinister agents, Princess
                             Leia races home aboard her
                             starship, custodian of the
                             stolen plans that can save
                             her people and restore
                             freedom to the galaxy....`);
    }, time);
}



// V2 works but unreadable
function openingCrawlNested(time) {
    setTimeout(() => {
        console.log(`It is a period of civil war.
                     Rebel spaceships, striking
                     from a hidden base, have won
                     their first victory against
                     the evil Galactic Empire.`);
        setTimeout(() => {
            console.log(`During the battle, Rebel
                         spies managed to steal secret
                         plans to the Empire's
                         ultimate weapon, the DEATH
                         STAR, an armored space
                         station with enough power to
                         destroy an entire planet.`);
            setTimeout(() => {
                console.log(`Pursued by the Empire's
                             sinister agents, Princess
                             Leia races home aboard her
                             starship, custodian of the
                             stolen plans that can save
                             her people and restore
                             freedom to the galaxy....`);
            }, time);
        }, time);
    }, time);
}

// Wraps setTimeout with a Promise
function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("bye");
        }, ms);
    });
}


// V3 with promise chaining
function openingCrawlChain(time) {
    wait(time)
        .then((phrase) => {
            console.log(phrase);
            console.log(`It is a period of civil war.
                     Rebel spaceships, striking
                     from a hidden base, have won
                     their first victory against
                     the evil Galactic Empire.`);
            return wait(time)
        })
        .then(() => {
            console.log(`During the battle, Rebel
                         spies managed to steal secret
                         plans to the Empire's
                         ultimate weapon, the DEATH
                         STAR, an armored space
                         station with enough power to
                         destroy an entire planet.`)
            return wait(time);
        })
        .then(() => {
            console.log(`Pursued by the Empire's
                             sinister agents, Princess
                             Leia races home aboard her
                             starship, custodian of the
                             stolen plans that can save
                             her people and restore
                             freedom to the galaxy....`);
        })
        .catch(e => console.log(e));
}

// V4 with async and await
async function openingCrawlAsync(time) {
    try {
        const phrase = await wait(time);
        console.log(phrase);
        console.log(`It is a period of civil war.
                    Rebel spaceships, striking
                    from a hidden base, have won
                    their first victory against
                    the evil Galactic Empire.`);
        await wait(time);
        console.log(`During the battle, Rebel
                        spies managed to steal secret
                        plans to the Empire's
                        ultimate weapon, the DEATH
                        STAR, an armored space
                        station with enough power to
                        destroy an entire planet.`)
        await wait(time);
        console.log(`Pursued by the Empire's
                            sinister agents, Princess
                            Leia races home aboard her
                            starship, custodian of the
                            stolen plans that can save
                            her people and restore
                            freedom to the galaxy....`);
    } catch (e) {
        console.log(e);
    }
}

openingCrawlAsync(3000);

(async () => await wait(2000))();