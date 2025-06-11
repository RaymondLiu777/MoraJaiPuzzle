/*
* Base Game Level Pack
*/
MoraJaiBox.registerLevel("master-bedroom", "trading-post",
    [[ "white", "gray", "white"],
    [ "white", "gray", "gray"],
    [ "gray", "gray", "white"]],
    ["white", "white", "white", "white"]
);

MoraJaiBox.registerLevel("trading-post", "underpass",
    [[ "pink", "gray", "gray"],
    [ "gray", "yellow", "yellow"],
    [ "gray", "yellow", "yellow"]],
    ["yellow", "yellow", "yellow", "yellow"]
);

MoraJaiBox.registerLevel("underpass", "tomb",
    [[ "black", "black", "black"],
    [ "gray", "black", "gray"],
    [ "yellow", "gray", "yellow"]],
    ["black", "black", "black", "black"]
);

MoraJaiBox.registerLevel("tomb", "closed-exhibition",
    [[ "gray", "purple", "gray"],
    [ "gray", "pink", "gray"],
    [ "purple", "purple", "purple"]],
    ["purple", "purple", "purple", "purple"]
);

MoraJaiBox.registerLevel("closed-exhibition", "sanctum1",
    [[ "orange", "black", "orange"],
    [ "orange", "red", "orange"],
    [ "orange", "black", "orange"]],
    ["red", "red", "red", "red"]
);

/*
* Sanctum Level Pack
*/

MoraJaiBox.registerLevel("sanctum1", "sanctum3",
    [[ "green", "black", "green"],
    [ "black", "black", "black"],
    [ "green", "yellow", "green"]],
    ["black", "black", "black", "black"]
);

// Move to end of sanctum puzzles because I think this is the hardest
MoraJaiBox.registerLevel("sanctum2", "sanctum4",
    [[ "gray", "green", "gray"],
    [ "orange", "red", "orange"],
    [ "white", "green", "black"]],
    ["red", "red", "red", "red"]
);

MoraJaiBox.registerLevel("sanctum3", "sanctum5",
    [[ "black", "yellow", "gray"],
    [ "yellow", "green", "yellow"],
    [ "gray", "yellow", "black"]],
    ["yellow", "yellow", "yellow", "yellow"]
);

MoraJaiBox.registerLevel("sanctum4", "sanctum8",
    [[ "yellow", "purple", "yellow"],
    [ "green", "red", "black"],
    [ "purple", "purple", "purple"]],
    ["white", "white", "white", "white"]
);

MoraJaiBox.registerLevel("sanctum5", "sanctum6",
    [[ "orange", "black", "orange"],
    [ "orange", "orange", "orange"],
    [ "purple", "green", "purple"]],
    ["orange", "orange", "orange", "orange"]
);

MoraJaiBox.registerLevel("sanctum6", "sanctum7",
    [[ "yellow", "yellow", "yellow"],
    [ "white", "pink", "white"],
    [ "gray", "gray", "gray"]],
    ["white", "white", "white", "white"]
);

MoraJaiBox.registerLevel("sanctum7", "sanctum2",
    [[ "pink", "pink", "gray"],
    [ "gray", "gray", "gray"],
    [ "orange", "orange", "orange"]],
    ["pink", "pink", "pink", "pink"]
);
MoraJaiBox.registerLevel("sanctum8", "",
    [[ "green", "gray", "green"],
    [ "gray", "orange", "orange"],
    [ "gray", "black", "purple"]],
    ["green", "green", "green", "green"]
);

// MoraJaiBox.registerLevel("underpass", "",
//     [[ "gray", "gray", "gray"],
//     [ "gray", "gray", "gray"],
//     [ "gray", "gray", "gray"]],
//     ["white", "white", "white", "white"]
// );