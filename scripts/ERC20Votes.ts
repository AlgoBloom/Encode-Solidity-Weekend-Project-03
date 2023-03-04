async function main () {
    console.log("Testing!");
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});