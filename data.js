// Game Data - This data object is made available globally
const gamesData = {
    free: [
        {
            league: "Bundesliga",
            time: "22:30",
            teamA: "Borrussia M",
            teamB: "RB Leipzig",
            prediction: "Away Win (2)", 
            odds: "2.15",
            status: "pending",
            isLive: false
        },
        {
            league: "Ligue 1",
            time: "20:45",
            teamA: "Metz",
            teamB: "Rennes",
            prediction: "Away Win (2)", 
            odds: "1.95",
            status: "pending",
            isLive: false
        },
        {
            league: "Premier League",
            time: "16:00",
            teamA: "Luton Town",
            teamB: "Man City",
            prediction: "Over 2.5 Goals", 
            odds: "1.45",
            status: "won",
            isLive: false
        }
    ],
    topSecret: [
        {
            league: "Segunda Division",
            time: "19:00",
            teamA: "Elche",
            teamB: "Eldense",
            prediction: "Home Win (1)", 
            odds: "1.75",
            status: "pending",
            isLive: false
        },
        {
            league: "Championship",
            time: "13:30",
            teamA: "Ipswich Town",
            teamB: "Norwich",
            prediction: "Over 2.5 Goals", 
            odds: "1.88",
            status: "pending",
            isLive: false
        },
        {
            league: "Bosnia & Herz.",
            time: "14:00",
            teamA: "Romanija Pale",
            teamB: "Zvijezda 09",
            prediction: "Under 2.5", 
            odds: "1.62",
            status: "pending",
            isLive: false
        },
        {
            league: "Europa League",
            time: "21:00",
            teamA: "Genk",
            teamB: "Cukaricki",
            prediction: "Home Win (1) & BTTS: Yes", 
            odds: "2.85",
            status: "won",
            isLive: false,
            score: "5:1"
        }
    ],
    ultimate: [
        {
            league: "Eredivisie",
            time: "18:45",
            teamA: "Zwolle",
            teamB: "RKC Waalwijk",
            prediction: "Home Win (1)", 
            odds: "1.80",
            status: "pending",
            isLive: false
        },
        {
            league: "Chilean Primera",
            time: "23:00",
            teamA: "Colo Colo",
            teamB: "Everton",
            prediction: "Over 2.5 Goals", 
            odds: "1.95",
            status: "pending",
            isLive: false
        },
        {
            league: "Champions League",
            time: "21:00",
            teamA: "AC Milan",
            teamB: "Newcastle",
            prediction: "Over 2.5 Goals", 
            odds: "1.90",
            status: "won",
            isLive: false,
            score: "2:1"
        },
        {
            league: "Champions League",
            time: "21:00",
            teamA: "Feyenoord",
            teamB: "Celtic",
            prediction: "BTTS: Yes", 
            odds: "1.62",
            status: "won",
            isLive: false,
            score: "1:3"
        },
    ],
    overUnder: [
        {
            league: "Premier League",
            time: "19:30",
            teamA: "Chelsea",
            teamB: "Man City",
            prediction: "Over 2.5 Goals", 
            odds: "1.55",
            status: "pending",
            isLive: false
        },
        {
            league: "Serie A",
            time: "21:00",
            teamA: "AC Milan",
            teamB: "Juventus",
            prediction: "Under 3.5 Goals", 
            odds: "1.65",
            status: "pending",
            isLive: false
        }
    ],
    btts: [
        {
            league: "Championship",
            time: "20:00",
            teamA: "Leicester City",
            teamB: "Sunderland",
            prediction: "BTTS: Yes", 
            odds: "1.70",
            status: "pending",
            isLive: true
        },
        {
            league: "Serie A",
            time: "18:30",
            teamA: "AS Roma",
            teamB: "Atalanta",
            prediction: "BTTS: Yes", 
            odds: "1.85",
            status: "won",
            isLive: false,
            score: "2:1"
        }
    ]
};
