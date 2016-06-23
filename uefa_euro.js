var UEFAEuro = function(year){
    
    this.year   = year;
    this.table  = {};

    this.add_group = function(group_name, teams){
        for(var i in teams){
            this.table[teams[i]] = {
                group: group_name,
                gp: 0,
                w: 0,
                d: 0,
                l: 0,
                gf: 0,
                ga: 0,
                gd: 0,
                pts: 0,
            };
        }
    };

    this.add_record = function(team_a, score_a, team_b, score_b){
        // count this match
        this.table[team_a].gp += 1;
        this.table[team_b].gp += 1;

        if(score_a > score_b){ // a win
            this.table[team_a].w += 1;
            this.table[team_b].l += 1;
            this.table[team_a].pts += 3;
        }
        else if(score_a == score_b){ // draw
            this.table[team_a].d += 1;
            this.table[team_b].d += 1;
            this.table[team_a].pts += 1;
            this.table[team_b].pts += 1;
        }
        else { // b win
            this.table[team_a].l += 1;
            this.table[team_b].w += 1;
            this.table[team_b].pts += 3;
        }

        // calculate goal
        this.table[team_a].gf += score_a;
        this.table[team_a].ga += score_b;
        this.table[team_a].gd =  this.table[team_a].gf - this.table[team_a].ga;
        this.table[team_b].gf += score_b;
        this.table[team_b].ga += score_a;
        this.table[team_b].gd =  this.table[team_b].gf - this.table[team_b].ga;
    };

    this.calc_table = function(debug){
        var data = {};

        // assign teams to group
        for(var title in this.table){
            var team = this.table[title];
            team.title = title;
            if(data[team.group]){
                data[team.group].push(team)
            }
            else {
                data[team.group] = [ team ]
            }
        }

        // rank team for each group
        for(var group in data){
            data[group] = data[group].sort(this.rank);
        }

        if(debug){
            for(var group in data){
                console.log('Group ' + group);
                console.table(data[group], ['title', 'gp', 'w', 'd', 'l', 'gf', 'ga', 'gd', 'pts']);
            }
        }
        return data;
    }

    this.calc_best_3rd = function(debug){
        var data3rd = [];
        var table = this.calc_table();
        for(var group in table){
            data3rd.push(table[group][2]); // collect 3rd
        }

        // rank
        data3rd = data3rd.sort(this.rank);

        if(debug){
            console.table(data3rd, ['title', 'group', 'gp', 'w', 'd', 'l', 'gf', 'ga', 'gd', 'pts']);
        }
        return data3rd;
    }

    this.rank = function(a, b){
        if(a.pts != b.pts){ // 1.point
            return b.pts - a.pts;
        }
        else if(a.gd != b.gd){ // 2.goal diff
            return b.gd - a.gd;
        }
        else { // 3.goal forward
            return b.gf - a.gf;
        }
    }

    this.show_round_of_16 = function(){
        // TODO
    }

    this.show_quarter_final = function(){
        // TODO
    }

    this.show_semi_final = function(){
        // TODO
    }

    this.show_final = function(){
        // TODO
    }

}
