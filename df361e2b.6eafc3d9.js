(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{70:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return b}));var a=n(2),o=n(6),i=(n(0),n(75)),s={id:"doc2",title:"2 - Coins, Spends and Wallets"},c={unversionedId:"doc2",id:"doc2",isDocsHomePage:!1,title:"2 - Coins, Spends and Wallets",description:"This guide directly continues on from part 1 so if you haven't read that, please do so before reading this.",source:"@site/docs/doc2.md",permalink:"/docs/doc2",editUrl:"https://github.com/Chia-Network/chialisp-web/edit/master/docs/doc2.md",sidebar:"someSidebar",previous:{title:"1 - CLVM Basics",permalink:"/docs/"},next:{title:"3 - Deeper into CLVM",permalink:"/docs/doc3"}},l=[{value:"Coins",id:"coins",children:[]},{value:"Spends",id:"spends",children:[]},{value:"Puzzles and Solutions in Practice",id:"puzzles-and-solutions-in-practice",children:[{value:"OpCodes",id:"opcodes",children:[]},{value:"Example 1: Password Locked Coin",id:"example-1-password-locked-coin",children:[]},{value:"Generating OpCodes from the Puzzle vs. from the Solution",id:"generating-opcodes-from-the-puzzle-vs-from-the-solution",children:[]},{value:"Example: Signature Locked Coin",id:"example-signature-locked-coin",children:[]}]},{value:"Wallets",id:"wallets",children:[{value:"Change Making",id:"change-making",children:[]},{value:"Coin Aggregation and Spend Bundles",id:"coin-aggregation-and-spend-bundles",children:[]},{value:"Standard Transaction",id:"standard-transaction",children:[]}]},{value:"Conclusions",id:"conclusions",children:[]}],r={rightToc:l};function b(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},r,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"This guide directly continues on from ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/"}),"part 1")," so if you haven't read that, please do so before reading this."),Object(i.b)("p",null,"This section of the guide will cover evaluating a program inside a program, how ChiaLisp relates to transactions and coins on the Chia network, and cover some techniques to create smart transactions using ChiaLisp.\nIf there are any terms that you aren't sure of, be sure to check the ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/doc5"}),"glossary"),"."),Object(i.b)("h2",{id:"coins"},"Coins"),Object(i.b)("p",null,"A coin's ID is constructed from 3 pieces of information."),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"The ID of its parent"),Object(i.b)("li",{parentName:"ol"},"The hash of its puzzle (AKA the puzzlehash)"),Object(i.b)("li",{parentName:"ol"},"The amount that it is worth")),Object(i.b)("p",null,"To construct a coin ID simply take the hash of these 3 pieces of information concatenated in order."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),"coinID == sha256(parent_ID + puzzlehash + amount)\n")),Object(i.b)("p",null,"This means that a coin's puzzle and amount are intrinsic parts of it.\nYou cannot change a coin's puzzle or amount, you can only spend a coin."),Object(i.b)("p",null,"The body of a coin is also made up of these 3 pieces of information, but instead of being hashed, they are stored in full.\nHere is the actual code that defines a coin:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'class Coin:\n    parent_coin_info: "CoinName"\n    puzzle_hash: ProgramHash\n    amount: uint64\n')),Object(i.b)("h2",{id:"spends"},"Spends"),Object(i.b)("p",null,"When you spend a coin you destroy it.\nUnless the behaviour of a puzzle designates what to do with the coin's value when it is spent, the value of the coin is also destroyed in the spend."),Object(i.b)("p",null,"To spend a coin you need 3 pieces of information (and an optional 4th)."),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"The coin's ID"),Object(i.b)("li",{parentName:"ol"},"The full source of the coin's puzzle"),Object(i.b)("li",{parentName:"ol"},"A solution to the coin's puzzle"),Object(i.b)("li",{parentName:"ol"},"(OPTIONAL) A collection of signatures grouped together, called an aggregated signature")),Object(i.b)("p",null,"Remember the puzzle and solution is the same as we covered in part 1, except the puzzle has already been stored inside the coin and anybody can submit a solution."),Object(i.b)("p",null,"The network / ledger-sim has no concept of coin ownership, anybody can attempt to spend any coin on the network.\nIt's up to the puzzles to prevent coins from being stolen or spent in unintended ways."),Object(i.b)("p",null,'If anybody can submit a solution for a coin, you maybe wondering how somebody can "own" a coin.\nBy the end of the next section of the guide, hopefully it should be clear.'),Object(i.b)("h2",{id:"puzzles-and-solutions-in-practice"},"Puzzles and Solutions in Practice"),Object(i.b)("p",null,"So far in ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/"}),"part 1")," we have covered ChiaLisp programs that will evaluate to some result.\nRemember the first part represents a puzzle which is committed to locking up a coin, and the second part is a solution anybody can submit:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),"$ brun '(+ 2 5)' '(40 50)'\n90\n\n$ brun '(c (q 800) 1)' '(\"some data\" 0xdeadbeef)'\n(800 \"some data\" 0xdeadbeef)\n")),Object(i.b)("p",null,"These are fun exercises in isolation, but this format can be used to communicate instructions to the blockchain network of how a coin should behave when it is spent.\nThis can be done by having the result of an evaluation be a list of ",Object(i.b)("strong",{parentName:"p"},"OpCodes"),"."),Object(i.b)("h3",{id:"opcodes"},"OpCodes"),Object(i.b)("p",null,"The OpCodes are split into two categories: ",Object(i.b)("em",{parentName:"p"},'"this spend is only valid if X"')," and ",Object(i.b)("em",{parentName:"p"},'"if this spend is valid then X"'),"."),Object(i.b)("p",null,"Here is the complete list of OpCodes along with their format and behaviour."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"AGG_SIG - ","[50]"," - (50 0xpubkey 0xmessage)"),": This spend is only valid if the attached aggregated signature contains a signature from the given public key of the given message."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"CREATE_COIN - ","[51]"," - (51 0xpuzzlehash amount)"),": If this spend is valid then create a new coin with the given puzzlehash and amount."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"ASSERT_ANNOUNCEMENT - ","[52]"," - (52 0xannouncementID)"),": This spend is only valid if the given Coin ID has also been spent in this block. This allows you to use the consumed coins value as part of your own output."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"ASSERT_MY_COIN_ID - ","[53]"," - (53 0xcoinID)"),": This spend is only valid if the presented coin ID is exactly the same as the ID of the coin that contains this puzzle."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"ASSERT_RELATIVE_TIME_EXCEEDS - ","[54]"," - (54 time)"),": This spend is only valid if the given time has passed."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"ASSERT_BLOCK_INDEX_EXCEEDS - ","[55]"," - (55 block_index)"),": The spend is only valid if the given block_index has been reached."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"ASSERT_BLOCK_AGE_EXCEEDS - ","[56]"," - (56 block_age)"),": The spend is only valid if the given block_age has surpassed the age of the coin being spent."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"AGG_SIG_ME - ","[57]"," - (57 0xpubkey 0xmessage)"),": The spend is only valid if the attached aggregated signature contains a signature from the specified public key of that message concatenated with the coin's id."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"ASSERT_FEE - ","[58]"," - (58 amount)"),": The spend is only valid if there is unused value in this transaction equal to ",Object(i.b)("em",{parentName:"li"},"amount"),", which is explicitly to be used as the fee."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"ASSERT_TIME_EXCEEDS - ","[59]"," - (59 time)"),": The spend is only valid if the given time has passed."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"CREATE_ANNOUNCEMENT - ","[60]"," - (60 message)"),": This creates an ephemeral announcement with an ID dependent on the coin that creates it. Other coins can then assert an announcement exists for inter-coin communication inside a block.")),Object(i.b)("p",null,"Conditions are returned as a list of lists in the form:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),"((51 0xabcd1234 200) (50 0x1234abcd) (53 0xdeadbeef))\n")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Remember: this is what a puzzle should evaluate to when presented with a solution so that a full-node/ledger-sim can understand it.")),Object(i.b)("p",null,"Let's create a few examples puzzles and solutions to demonstrate how this is used in practice."),Object(i.b)("h3",{id:"example-1-password-locked-coin"},"Example 1: Password Locked Coin"),Object(i.b)("p",null,"Let's create a coin that can be spent by anybody as long as they know the password."),Object(i.b)("p",null,'To implement this we would have the hash of the password committed into the puzzle and, if presented with the correct password, the puzzle will return instructions to create a new coin with a puzzlehash given in the solution.\nFor the following example the password is "hello" which has the hash value 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824.\nThe implementation for the above coin would be thus:'),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),'(i (= (sha256 2) (q 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824)) (c (q . 51) (c 5 (c (q . 100) ()))) (q "wrong password"))\n')),Object(i.b)("p",null,"This program takes the hash, with ",Object(i.b)("inlineCode",{parentName:"p"},"(sha256 )"),", of the first element in the solution, with ",Object(i.b)("inlineCode",{parentName:"p"},"2"),", and compares that value with the already committed.\nIf the password is correct it will return ",Object(i.b)("inlineCode",{parentName:"p"},"(c (q . 51) (c 5 (c (q . 100) (q ())))")," which evaluates to ",Object(i.b)("inlineCode",{parentName:"p"},"(51 0xmynewpuzzlehash 100)"),".\nRemember, ",Object(i.b)("inlineCode",{parentName:"p"},"51")," is the OpCode to create a new coin using the puzzlehash presented in the solution, and ",Object(i.b)("inlineCode",{parentName:"p"},"5")," is equivalent to ",Object(i.b)("inlineCode",{parentName:"p"},"(f (r 1))"),"."),Object(i.b)("p",null,'If the password is incorrect it will return the string "wrong password".'),Object(i.b)("p",null,"The format for a solution to this is expected to be formatted as ",Object(i.b)("inlineCode",{parentName:"p"},"(password newpuzzlehash)"),".\nRemember, anybody can attempt to spend this coin as long as they know the coin's ID and the full puzzle code."),Object(i.b)("p",null,"Let's test it out using clvm_tools."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),'$ brun \'(i (= (sha256 2) (q 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824)) (c (c (q 51) (c 5 (c (q 100) (q ())))) (q ())) (q "wrong password"))\' \'("let_me_in" 0xdeadbeef)\'\n"wrong password"\n\n$ brun \'(i (= (sha256 2) (q 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824)) (c (q 51) (c 5 (c (q 100) (q ())))) (q "wrong password"))\' \'("incorrect" 0xdeadbeef)\'\n"wrong password"\n\n$ brun \'(i (= (sha256 2) (q 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824)) (c (q 51) (c 5 (c (q 100) (q ())))) (q "wrong password"))\' \'("hello" 0xdeadbeef)\'\n((51 0xdeadbeef 100))\n')),Object(i.b)("p",null,"There is one final change we need to make before this is a complete smart transaction."),Object(i.b)("p",null,"If you want to invalidate a spend then you need to raise an exception using ",Object(i.b)("inlineCode",{parentName:"p"},"x"),".\nOtherwise you just have a valid spend that isn't returning any OpCodes, and that would destroy our coin and not create a new one!\nSo we need to change the fail condition to be ",Object(i.b)("inlineCode",{parentName:"p"},'(x (q . "wrong password"))')," which means the transaction fails and the coin is not spent."),Object(i.b)("p",null,"If we're doing this then we should also change the ",Object(i.b)("inlineCode",{parentName:"p"},"(i A B C)")," pattern to ",Object(i.b)("inlineCode",{parentName:"p"},"(a (i A (q . B) (q . C)) 1)"),".\nThe reason for this is explained in ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/doc3/"}),"part 3"),". For now don't worry about why."),Object(i.b)("p",null,"Here is our completed password protected coin:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),'(a (i (= (sha256 2) (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824)) (q . (c (c (q . 51) (c 5 (c (q . 100) ()))) ())) (q . (x (q . "wrong password")))) 1)\n')),Object(i.b)("p",null,"Let's test it out using clvm_tools:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),'$ brun \'(a (i (= (sha256 2) (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824)) (q . (c (c (q . 51) (c 5 (c (q . 100) ()))) ())) (q . (x (q . "wrong password")))) 1)\' \'("let_me_in" 0xdeadbeef)\'\nFAIL: clvm raise ("wrong password")\n\n$ brun \'(a (i (= (sha256 2) (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824)) (q . (c (c (q . 51) (c 5 (c (q . 100) ()))) ())) (q . (x (q . "wrong password")))) 1)\' \'("hello" 0xdeadbeef)\'\n((51 0xdeadbeef 100))\n')),Object(i.b)("h3",{id:"generating-opcodes-from-the-puzzle-vs-from-the-solution"},"Generating OpCodes from the Puzzle vs. from the Solution"),Object(i.b)("p",null,'Let\'s take a moment to consider the balance of power between the send and the spender.\nAnother way of phrasing this is "how much control over the output should the solution have?"'),Object(i.b)("p",null,"Suppose we lock a coin up using the following puzzle:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),"(q . ((51 0x365bdd80582fcc2e4868076ab9f24b482a1f83f6d88fd795c362c43544380e7a 100)))\n")),Object(i.b)("p",null,"Regardless of what solution is passed this puzzle will ",Object(i.b)("em",{parentName:"p"},"always")," return instructions to create a new coin with the puzzlehash 0x365bdd80582fcc2e4868076ab9f24b482a1f83f6d88fd795c362c43544380e7a and the amount 100."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),"$ brun '(q . ((51 0x365bdd80582fcc2e4868076ab9f24b482a1f83f6d88fd795c362c43544380e7a 100)))' '(80 90 \"hello\")'\n((51 0x365bdd80582fcc2e4868076ab9f24b482a1f83f6d88fd795c362c43544380e7a 100))\n\n$ brun '(q . ((51 0x365bdd80582fcc2e4868076ab9f24b482a1f83f6d88fd795c362c43544380e7a 100)))' '(\"it doesn't matter what we put here\")'\n((51 0x365bdd80582fcc2e4868076ab9f24b482a1f83f6d88fd795c362c43544380e7a 100))\n")),Object(i.b)("p",null,"In this example the result of spending the coin is entirely determined from the puzzle.\nEven though anybody could initiate the spend of the coin, the person that locked the coin up has all the power in the way that the coin is spent as the solution doesn't matter at all."),Object(i.b)("p",null,"Conversely lets consider a coin locked up with the following puzzle:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),"1\n")),Object(i.b)("p",null,"This example may look a little weird, because most ChiaLisp programs are lists, and this is just an atom, but it is still a valid program.\nThis puzzle simply returns the entire solution to the blockchain.\nYou can think about this in terms of power and control.\nThe person that locked the coin up has given all the power to the person who provides the solution."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),"$ brun '1' '((51 0xf00dbabe 50) (51 0xfadeddab 50))'\n((51 0xf00dbabe 50) (51 0xfadeddab 50))\n\n$ brun '1' '((51 0xf00dbabe 75) (51 0xfadeddab 15) (51 0x1234abcd 10))'\n((51 0xf00dbabe 75) (51 0xfadeddab 15) (51 0x1234abcd 10))\n")),Object(i.b)("p",null,"In this situation, not only can anybody can spend the coin, they can spend it however they like!\nThis balance of power determines a lot of how puzzles are designed in ChiaLisp."),Object(i.b)("p",null,"For example, let's create a puzzle that lets the spender choose the output, but with one stipulation."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),"  (c (q . (51 0xcafef00d 200)) 1)\n")),Object(i.b)("p",null,"This will let the spender return any conditions and OpCodes they want via the solution but will always add the condition to create a coin with the puzzlehash 0xcafef00d and value 200."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"$ brun '(c (q . (51 0xcafef00d 200)) 1)' '((51 0xf00dbabe 75) (51 0xfadeddab 15) (51 0x1234abcd 10))'\n((51 0xcafef00d 200) (51 0xf00dbabe 75) (51 0xfadeddab 15) (51 0x1234abcd 10))\n")),Object(i.b)("p",null,"This section is intended to demonstrate the point that OpCodes can come from both the recipient's solution and from the sender's puzzle, and how that represents trust and the balance of power."),Object(i.b)("p",null,'In the next exercise we will put everything we know together and create the "standard" transaction in Chia that underpins how wallets are able to send money to each other.'),Object(i.b)("h3",{id:"example-signature-locked-coin"},"Example: Signature Locked Coin"),Object(i.b)("p",null,"To 'send a coin to somebody' you simply create a puzzle that requires the recipients signature, but then allows them to return any other OpCodes that they like.\nThis means that the coin cannot be spent by anybody else, but the outputs are entirely decided by the recipient."),Object(i.b)("p",null,"We can construct the following smart transaction where AGGSIG is 50 and the recipient's pubkey is ",Object(i.b)("inlineCode",{parentName:"p"},"0xfadedcab"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),"(c (c (q . 50) (c (q . 0xfadedcab) (c (sha256 2) (q . ())))) 3)\n")),Object(i.b)("p",null,"This puzzle forces the resultant evaluation to contain ",Object(i.b)("inlineCode",{parentName:"p"},"(50 0xpubkey *hash_of_first_solution_arg*)")," but then adds on all of the conditions presented in the solution."),Object(i.b)("p",null,"Let's test it out in clvm_tools - for this example the recipient's pubkey will be represented as 0xdeadbeef.\nThe recipient wants to spend the coin to create a new coin which is locked up with the puzzle 0xfadeddab."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),"$ brun '(c (c (q . 50) (c (q . 0xfadedcab) (c (sha256 2) (q . ())))) 3)' '(\"hello\" (51 0xcafef00d 200))'\n((50 0xfadedcab 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824) (51 0xcafef00d 200))\n")),Object(i.b)("p",null,"Brilliant."),Object(i.b)("p",null,"Let's pull back and add some context here."),Object(i.b)("h2",{id:"wallets"},"Wallets"),Object(i.b)("p",null,"A wallet is some software that has several features that make it easy for a user to interact with coins."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"A wallet keeps track of public and private keys"),Object(i.b)("li",{parentName:"ul"},"A wallet can generate puzzles and solutions"),Object(i.b)("li",{parentName:"ul"},"A wallet can sign things with its keys"),Object(i.b)("li",{parentName:"ul"},"A wallet can identify and remember what coins that the user 'owns'"),Object(i.b)("li",{parentName:"ul"},"A wallet can spend coins")),Object(i.b)("p",null,"You may be wondering how a wallet is able to identify what coins that the user 'owns' if any person can attempt to spend a coin.\nThis is because all wallets already know and agree on what the standard format for sending a coin to somebody is.\nThey know what their own pubkeys are, so when a new coin is created a wallet can check if the puzzle inside that coin is a 'standard send puzzle' to one of their pubkeys.\nIf it is, then that coin can be considered to be owned by that 'wallet' as nobody else can spend it."),Object(i.b)("p",null,"If the wallet that 'owns' the coin then wanted to send that coin on again to somebody else, they would generate a 'standard send puzzle' but with the new recipient's pubkey.\nThey could then spend the coin that they own, destroying it, and creating a new coin that is locked up with the new recipients pubkey in the process.\nThe new recipient can then identify that it 'owns' the coin and can send it on as they wish later."),Object(i.b)("h3",{id:"change-making"},"Change Making"),Object(i.b)("p",null,"Change making is simple.\nIf a wallet spends less than the total value of a coin, they can create another coin with the remaining portion of value, and lock it up with the standard puzzle for themselves again.\nYou can split a coin up into as many new coins with fractions of the original value as you'd like."),Object(i.b)("p",null,"You cannot create two coins of the same value, with the same puzzlehash, from the same parent as this will lead to an ID collision and the spend will be rejected."),Object(i.b)("h3",{id:"coin-aggregation-and-spend-bundles"},"Coin Aggregation and Spend Bundles"),Object(i.b)("p",null,"You can aggregate a bunch of smaller coins together into one large coin.\nTo do this, you can create a SpendBundle which groups together one or more spends so that they cannot be split.\nThe SpendBundle also contains an Aggregated Signature object which is how the AGGSIG condition can check if a value has been signed."),Object(i.b)("p",null,"You can also further tighten the link between them by using ASSERT_COIN_CONSUMED.\nSuppose you have a 20 coin and an 80 coin.\nIn the 20 coin you can make it return ",Object(i.b)("inlineCode",{parentName:"p"},"(CREATE_COIN 0xnewpuzhash 100)")," in the spend.\nThen in the 80 coin you can make it return ",Object(i.b)("inlineCode",{parentName:"p"},"(ASSERT_COIN_CONSUMED 0xcoinID)"),".\nThe coupling inside the SpendBundle and the 80 value asserting its relationship to the 20 means that the value from the 80 coin is channeled into the creation of the new value 100 coin."),Object(i.b)("h3",{id:"standard-transaction"},"Standard Transaction"),Object(i.b)("p",null,"We can construct an even more powerful version of the signature locked coin to use as our standard transaction."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),"(c (c (q . 50) (c (q . 0xfadedcab) (c (sha256 2) (q . ())))) (a 5 11))\n")),Object(i.b)("p",null,"The first part is mostly the same, the puzzle always returns an AGGSIG check for the pubkey ",Object(i.b)("inlineCode",{parentName:"p"},"0xfadedcab"),".\nHowever it only checks for the first element of the solution.\nThis is because instead of the solution for this puzzle being a list of OpConditions to be printed out, the solution is a program/solution pair.\nThis means that the recipient can run their own program as part of the solution generation, or sign a puzzle and let somebody else provide the solution."),Object(i.b)("p",null,"The new program and solution inside the solution are evaluated and the result of that is added to the OpCode output.\nWe will cover in more detail how this works in the ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/doc3/"}),"next part")," of this guide."),Object(i.b)("p",null,"A basic solution for this standard transaction might look like:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),'("hello" (q . ((51 0xmynewpuzzlehash 50) (51 0xanothernewpuzzlehash 50))) (q . ()))\n')),Object(i.b)("p",null,"Running that in the clvm_tools looks like this:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-lisp"}),"$ brun '(c (c (q . 50) (c (q . 0xfadedcab) (c (sha256 2) (q . ())))) (a 5 11))' '(\"hello\" (q . ((51 0xdeadbeef 50) (51 0xf00dbabe 50))) (q . ()))'\n\n((50 0xfadeddab 0x1f82d4d4c6a32459143cf8f8d27ca04be337a59f07238f1f2c31aaf0cd51d153) (51 0xdeadbeef 50) (51 0xf00dbabe 50))\n")),Object(i.b)("h2",{id:"conclusions"},"Conclusions"),Object(i.b)("p",null,'Coin ownership refers to the concept of creating a coin with a puzzle that means it can only be spent when signed by the private key of the coin\'s "owner".\nThe goal of wallet software is to generate, interpret and manage these kinds of coins and puzzles.'),Object(i.b)("p",null,"The next part of this guide will go further in depth in ChiaLisp, and cover how to write more complex puzzles.\nIf any of the material in this part of the guide has got you confused, try returning to it after the next part."))}b.isMDXComponent=!0},75:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return u}));var a=n(0),o=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var r=o.a.createContext({}),b=function(e){var t=o.a.useContext(r),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=b(e.components);return o.a.createElement(r.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},p=o.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,r=l(e,["components","mdxType","originalType","parentName"]),d=b(n),p=a,u=d["".concat(s,".").concat(p)]||d[p]||h[p]||i;return n?o.a.createElement(u,c(c({ref:t},r),{},{components:n})):o.a.createElement(u,c({ref:t},r))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,s=new Array(i);s[0]=p;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,s[1]=c;for(var r=2;r<i;r++)s[r]=n[r];return o.a.createElement.apply(null,s)}return o.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);