import { translations } from './translations';
import { regex } from './regex';

export function trans_from_dict(a: string): string {
    var b = translations[a];
    if (b) return b;
    return a;
}

export function t(originalStr: string, translations: Record<string, string>): string {
    var tmp = originalStr.trim();
    if (translations[tmp])
        return translations[tmp];
    if (originalStr.match(regex.regex_chn))
        return originalStr;
    if (originalStr.match(regex.regex_team)) {
        return RegExp.$1 + "的队伍：";
    }
    if (originalStr.match(regex.regex_youjoined)) {
        return  "你加入了" + RegExp.$1;
    }
    if (originalStr.match(regex.regex_seconds_left)) {
        return RegExp.$1 + "还剩" + RegExp.$2 + "秒。";
    }
    if(originalStr.match(regex.regex_timer_on)){
        return "战斗计时器已经开启：玩家若不行动则在时间耗尽后会输掉比赛。（由"+RegExp.$1+"发起）";
    }
    if (originalStr.match(regex.regex_reset_timer)) {
        return "还剩" + RegExp.$1 + "秒可以重新开启计时器。";
    }
    if (originalStr.match(regex.regex_joined)) {
        return RegExp.$1.replace(", ", "，").replace(/ and /g, "和") + "进入了房间";
    }
    if (originalStr.match(regex.regex_left)) {
        return RegExp.$1.replace(", ", "，").replace(/ and /g, "和") + "离开了";
    }
    if (originalStr.match(regex.regex_sent_out)) {
        return RegExp.$1 + "放出了";
    }

    if (originalStr.match(regex.regex_lost_health)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "失去了 " + RegExp.$3 + "% 的生命值！";
    }
    if (originalStr.match(regex.regex_lost_health2)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "失去了 ";
    }
    if (originalStr.match(regex.regex_hp_restored)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "的HP回复了。";
    }
    if (tmp.indexOf("'s ") != -1 && tmp.indexOf("!]") != -1) {
        tmp = tmp.replace("'s ", "").replace("!]", "");
        return "的" + translations[tmp] + "!]";
    }
    if (tmp.indexOf(" withdrew ") != -1) {
        var splitted = tmp.split(" withdrew ");
        return splitted[0] + "收回了" + trans_from_dict(splitted[1].replace("!", "")) + "！";
    }
    if (originalStr.match(regex.regex_come_back)) {
        return trans_from_dict(RegExp.$1) + "，回来吧！";
    }
    if (originalStr.match(regex.regex_go)) {
        return "去吧，" + trans_from_dict(RegExp.$1) + "(";
    }
    if (originalStr.match(regex.regex_stat_change)) {
        if (trans_from_dict(RegExp.$3) != RegExp.$3)
            return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + trans_from_dict(RegExp.$3);
    }
    if (originalStr.match(regex.regex_forfeited)) {
        return RegExp.$1.replace(", ", "，") + "投降了";
    }
    //preview
    if ((originalStr.match(/ \/ /g) || []).length > 2) {
        var pokes = originalStr.split(" / ");
        var ret = trans_from_dict(pokes[0]);
        if (ret == pokes[0])
            return originalStr;
        var pos = 1;
        while (pokes[pos]) {
            ret += " / " + translations[pokes[pos]];
            pos++;
            if (pos >= 6) break;
        }
        return ret;
    }
    if (originalStr.match(regex.regex_mega)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "超级进化为Mega" + translations[RegExp.$3] + "！";
    }
    if (originalStr.match(regex.regex_g6_mega)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "的" + translations[RegExp.$3] + "响应了" + RegExp.$4 + "的Mega手环！";
    }
    if (originalStr.match(regex.regex_disable)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "的" + translations[RegExp.$3] + "无法使用！";
    }

    if (originalStr.match(regex.single_word_pm)) {
        var trans_3 = trans_from_dict(RegExp.$3);
        if (trans_3 != RegExp.$3) {
            return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + trans_3;
        }
    }
    if (originalStr.match(regex.double_word_pm)) {
        var trans_3 = trans_from_dict(RegExp.$3);
        if (trans_3 != RegExp.$3) {
            return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + trans_3;
        }
    }
    if (originalStr.match(regex.bracket_single_word_pm)) {
        var trans_3 = trans_from_dict(RegExp.$3);
        if (trans_3 != RegExp.$3) {
            return "(" + trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + trans_3 + ")";
        }
    }
    if (originalStr.match(regex.bracket_double_word_pm)) {
        var trans_3 = trans_from_dict(RegExp.$3);
        if (trans_3 != RegExp.$3) {
            return "(" + trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + trans_3 + ")";
        }
    }
    if (originalStr.match(regex.regex_after_taunt)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "因为挑拨不能使用" + translations[RegExp.$3] + "！";
    }
    if (originalStr.match(regex.regex_cannot_use)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "不能使用" + translations[RegExp.$3] + "！";
    }
    if (originalStr.match(regex.regex_item_pokemon)) {
        return trans_from_dict(RegExp.$1) + "降低了对" + trans_from_dict(RegExp.$3) + "造成的伤害！";
    }
    if (originalStr.match(regex.regex_eat)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + (RegExp.$3 == "used" ? "使用了" : "吃掉了") + "它的" + trans_from_dict(RegExp.$4) + "！";
    }
    if (originalStr.match(regex.regex_ability_act)) {
        return "[" + trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "的" + trans_from_dict(RegExp.$3) + "]";
    }
    if (originalStr.match(regex.regex_move_no_effect)) {
        return "(这对" + trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "没有效果)";
    }
    if (originalStr.match(regex.regex_obtained)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "获得了" + trans_from_dict(RegExp.$3) + "。";
    }
    if (originalStr.match(regex.regex_max_guard)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "展开了极巨防壁！";
    }
    if (originalStr.match(regex.regex_pointed_stones)) {
        return "锋利的岩石扎进了" + trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "的身体！";
    }
    if (originalStr.match(regex.regex_future_sight)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "预知了攻击！";
    }
    if (originalStr.match(regex.regex_future_sight2)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "受到了预知未来的攻击！";
    }
    if (originalStr.match(regex.regex_type_change)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "的属性变成了" + trans_from_dict(RegExp.$3) + "!";
    }
    if (originalStr.match(regex.regex_hit_times)) {
        return "击中了" + RegExp.$1 + "次！";
    }
    if (originalStr.match(regex.regex_ability)) {
        originalStr = originalStr.replace(regex.regex_ability, "特性: ");
        if (translations[RegExp.$1]) {
            originalStr += translations[RegExp.$1];
        }
        return originalStr;
    }

    if (originalStr.match(regex.regex_knock)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "打落了" + trans_from_dict(RegExp.$3) + trans_from_dict(RegExp.$4) + "的" + trans_from_dict(RegExp.$5) + "!";
    }
    if (originalStr.match(regex.regex_trace)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "复制了" + trans_from_dict(RegExp.$3) + trans_from_dict(RegExp.$4) + "的" + trans_from_dict(RegExp.$5) + "!";
    }

    if (originalStr.match(regex.regex_Item)) {
        originalStr = originalStr.replace(regex.regex_Item, "道具: ");
        if (translations[RegExp.$1]) {
            originalStr += translations[RegExp.$1];
        }
        return originalStr;
    }

    if (originalStr.match(regex.regex_start_battle)) {
        return RegExp.$1 + " 与 " + RegExp.$2 + " 的对战开始了！";
    }
    if (originalStr.match(/^\((.*)\)$/)) {
        if (translations[RegExp.$1])
            return "(" + translations[RegExp.$1] + ")";
    }
    if (originalStr.match(/transformed into ([A-z -]+)!/)) {
        return "变成了" + translations[RegExp.$1] + "！";
    }
    if (originalStr.match(regex.regex_uturn)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "回到了" + RegExp.$3 + "的身边！";
    }
    if (originalStr.match(regex.regex_magic_bounce)) {
        return "把" + translations[RegExp.$1] + "反弹回去了！";
    }
    if (originalStr.match(regex.regex_dynamax)) {
        return trans_from_dict(RegExp.$1) + trans_from_dict(RegExp.$2) + "的极巨化！";
    }

    if (originalStr.match(regex.regex_gems)) {
        return translations[RegExp.$1] + "提升了" + translations[RegExp.$2] + "的威力!";
    }

    if (originalStr.match(regex.regex_room_expired)) {
        return '房间“' + RegExp.$1 + '”不存在。\n您要进入的对战已过期。超过15分钟未活动且未保存的对战将过期，请及时保存回放。';
    }

    if (originalStr.match(regex.regex_battle)) {
        return RegExp.$1 + "想要战斗！";
    }

    if (originalStr.match(regex.regex_cancelled)) {
        return RegExp.$1 + "取消了战斗。";
    }
    if (originalStr.match(regex.regex_wftcy)) {
        return  "等待" + RegExp.$1 + "挑战你";
    }
    if (originalStr.match(regex.regex_waitingavailable)) {
        return "等待战斗开始" + RegExp.$1;
    }
    if (originalStr.match(regex.regex_waiting)) {
        return "等待" + RegExp.$1;
    }
    if (originalStr.match(regex.regex_accepted)) {
        return RegExp.$1 + "接受挑战，对战开始";
    }
    if (originalStr.match(regex.regex_copyofuntitled)) {
        return "副本无标题" + RegExp.$1;
    }
    if (originalStr.match(regex.regex_untitled)) {
        return "无标题" + RegExp.$1;
    }
    if (originalStr.match(regex.regex_copyof)) {
        return "副本" + RegExp.$1;
    }
    if (originalStr.match(regex.regex_newteam)) {
        return "新的" + RegExp.$1 + "队伍";
    }
    if (originalStr.match(regex.regex_users)) {
        return RegExp.$1 + "位用户";
    }
    if (originalStr.match(regex.regex_theopposingfainted)) {
        return "对手的" +  translations[RegExp.$1] + "倒下了！";
    }
    if (originalStr.match(regex.regex_fainted)) {
        return translations[RegExp.$1] + "倒下了！";
    }
    if (originalStr.match(regex.regex_theopposingleftover)) {
        return "对手的" + translations[RegExp.$1] + "通过剩饭恢复了一点HP！";
    }
    if (originalStr.match(regex.regex_leftover)) {
        return translations[RegExp.$1] + "通过剩饭恢复了一点HP！";
    }
    if (originalStr.match(regex.regex_wish)) {
        return translations[RegExp.$1] + "的祈愿成真了！";
    }
    if (originalStr.match(regex.regex_doestaffecttd)) {
        return "这并没有影响到对手的" + translations[RegExp.$1];
    }

    if (originalStr.match(regex.regex_doestaffect)) {
        return "这并没有影响到" + translations[RegExp.$1];
    }
    if (originalStr.match(regex.regex_younoteams)) {
        return "你没有" + RegExp.$1 + "队伍";
    }
    if (originalStr.match(regex.regex_youdontha)) {
        return "你没有任何" + RegExp.$1 + "队伍";
    }
    if (originalStr.match(regex.regex_xteams)) {
        return RegExp.$1 + "队伍";
    }
    if (originalStr.match(regex.regex_theinverted)) {
        return "对手的" + translations[RegExp.$1] + "能力变化颠倒过来了！";
    }
    if (originalStr.match(regex.regex_inverted)) {
        return  translations[RegExp.$1] + "能力变化颠倒过来了！";
    }
    if (originalStr.match(regex.regex_toattackrd)) {
        return  "对手" + translations[RegExp.$1] + "的攻击巨幅提高了！";
    }
    if (originalStr.match(regex.regex_todefenserd)) {
        return  "对手" + translations[RegExp.$1] + "的防御巨幅提高了！";
    }
    if (originalStr.match(regex.regex_tospard)) {
        return  "对手" + translations[RegExp.$1] + "的特攻巨幅提高了！";
    }
    if (originalStr.match(regex.regex_tospdrd)) {
        return  "对手" + translations[RegExp.$1] + "的特防巨幅提高了！";
    }
    if (originalStr.match(regex.regex_tosperd)) {
        return  "对手" + translations[RegExp.$1] + "的速度巨幅提高了！";
    }
    if (originalStr.match(regex.regex_toevasivenessrd)) {
        return  "对手" + translations[RegExp.$1] + "的闪避率巨幅提高了！";
    }
    if (originalStr.match(regex.regex_toaccuracyrd)) {
        return  "对手" + translations[RegExp.$1] + "的命中率巨幅提高了！";
    }
    if (originalStr.match(regex.regex_attackrd)) {
        return  translations[RegExp.$1] + "的攻击巨幅提高了！";
    }
    if (originalStr.match(regex.regex_defenserd)) {
        return  translations[RegExp.$1] + "的防御巨幅提高了！";
    }
    if (originalStr.match(regex.regex_spard)) {
        return  translations[RegExp.$1] + "的特攻巨幅提高了！";
    }
    if (originalStr.match(regex.regex_spdrd)) {
        return  translations[RegExp.$1] + "的特防巨幅提高了！";
    }
    if (originalStr.match(regex.regex_sperd)) {
        return  translations[RegExp.$1] + "的速度巨幅提高了！";
    }
    if (originalStr.match(regex.regex_evasivenessrd)) {
        return  translations[RegExp.$1] + "的闪避率巨幅提高了！";
    }
    if (originalStr.match(regex.regex_accuracyrd)) {
        return  translations[RegExp.$1] + "的命中率巨幅提高了！";
    }
    if (originalStr.match(regex.regex_toattackfs)) {
        return  "对手" + translations[RegExp.$1] + "的攻击巨幅降低了！";
    }
    if (originalStr.match(regex.regex_todefensefs)) {
        return  "对手" + translations[RegExp.$1] + "的防御巨幅降低了！";
    }
    if (originalStr.match(regex.regex_tospafs)) {
        return  "对手" + translations[RegExp.$1] + "的特攻巨幅降低了！";
    }
    if (originalStr.match(regex.regex_tospdfs)) {
        return  "对手" + translations[RegExp.$1] + "的特防巨幅降低了！";
    }
    if (originalStr.match(regex.regex_tospefs)) {
        return  "对手" + translations[RegExp.$1] + "的速度巨幅降低了！";
    }
    if (originalStr.match(regex.regex_toevasivenessfs)) {
        return  "对手" + translations[RegExp.$1] + "的闪避率巨幅降低了！";
    }
    if (originalStr.match(regex.regex_toaccuracyfs)) {
        return  "对手" + translations[RegExp.$1] + "的命中率巨幅降低了！";
    }
    if (originalStr.match(regex.regex_attackrfs)) {
        return  translations[RegExp.$1] + "的攻击巨幅降低了！";
    }
    if (originalStr.match(regex.regex_defensefs)) {
        return  translations[RegExp.$1] + "的防御巨幅降低了！";
    }
    if (originalStr.match(regex.regex_spafs)) {
        return  translations[RegExp.$1] + "的特攻巨幅降低了！";
    }
    if (originalStr.match(regex.regex_spdfs)) {
        return  translations[RegExp.$1] + "的特防巨幅降低了！";
    }
    if (originalStr.match(regex.regex_spefs)) {
        return  translations[RegExp.$1] + "的速度巨幅降低了！";
    }
    if (originalStr.match(regex.regex_evasivenessfs)) {
        return  translations[RegExp.$1] + "的闪避率巨幅降低了！";
    }
    if (originalStr.match(regex.regex_accuracyfs)) {
        return  translations[RegExp.$1] + "的命中率巨幅降低了！";
    }

    if (originalStr.match(regex.regex_toattackrosesharply)) {
        return  "对手" + translations[RegExp.$1] + "的攻击大幅提高了！";
    }
    if (originalStr.match(regex.regex_todefenserosesharply)) {
        return  "对手" + translations[RegExp.$1] + "的防御大幅提高了！";
    }
    if (originalStr.match(regex.regex_tospatkrosesharply)) {
        return  "对手" + translations[RegExp.$1] + "的特攻大幅提高了！";
    }
    if (originalStr.match(regex.regex_tospdefrosesharply)) {
        return  "对手" + translations[RegExp.$1] + "的特防大幅提高了！";
    }
    if (originalStr.match(regex.regex_tospeedrosesharply)) {
        return  "对手" + translations[RegExp.$1] + "的速度大幅提高了！";
    }
    if (originalStr.match(regex.regex_toevasivenessrosesharply)) {
        return  "对手" + translations[RegExp.$1] + "的闪避率大幅提高了！";
    }
    if (originalStr.match(regex.regex_toaccuracyrosesharply)) {
        return  "对手" + translations[RegExp.$1] + "的命中率大幅提高了！";
    }
    if (originalStr.match(regex.regex_toattackfellharshly)) {
        return  "对手" + translations[RegExp.$1] + "的攻击大幅降低了！";
    }
    if (originalStr.match(regex.regex_todefensefellharshly)) {
        return  "对手" + translations[RegExp.$1] + "的防御大幅降低了！";
    }
    if (originalStr.match(regex.regex_tospatkfellharshly)) {
        return  "对手" + translations[RegExp.$1] + "的特攻大幅降低了！";
    }
    if (originalStr.match(regex.regex_tospdeffellharshly)) {
        return  "对手" + translations[RegExp.$1] + "的特防大幅降低了！";
    }
    if (originalStr.match(regex.regex_tospeedfellharshly)) {
        return  "对手" + translations[RegExp.$1] + "的速度大幅降低了！";
    }
    if (originalStr.match(regex.regex_toevasivenessfellharshly)) {
        return  "对手" + translations[RegExp.$1] + "的闪避率大幅降低了！";
    }
    if (originalStr.match(regex.regex_toaccuracyfellharshly)) {
        return  "对手" + translations[RegExp.$1] + "的命中率大幅降低了！";
    }
    if (originalStr.match(regex.regex_toattackrose)) {
        return  "对手" + translations[RegExp.$1] + "的攻击提高了！";
    }
    if (originalStr.match(regex.regex_todefenserose)) {
        return  "对手" + translations[RegExp.$1] + "的防御提高了！";
    }
    if (originalStr.match(regex.regex_tospatkrose)) {
        return  "对手" + translations[RegExp.$1] + "的特攻提高了！";
    }
    if (originalStr.match(regex.regex_tospdefrose)) {
        return  "对手" + translations[RegExp.$1] + "的特防提高了！";
    }
    if (originalStr.match(regex.regex_tospeedrose)) {
        return  "对手" + translations[RegExp.$1] + "的速度提高了！";
    }
    if (originalStr.match(regex.regex_toevasivenessrose)) {
        return  "对手" + translations[RegExp.$1] + "的闪避率提高了！";
    }
    if (originalStr.match(regex.regex_toaccuracyrose)) {
        return  "对手" + translations[RegExp.$1] + "的命中率提高了！";
    }
    if (originalStr.match(regex.regex_toattackfell)) {
        return  "对手" + translations[RegExp.$1] + "的攻击降低了！";
    }
    if (originalStr.match(regex.regex_todefensefell)) {
        return  "对手" + translations[RegExp.$1] + "的防御降低了！";
    }
    if (originalStr.match(regex.regex_tospatkfell)) {
        return  "对手" + translations[RegExp.$1] + "的特攻降低了！";
    }
    if (originalStr.match(regex.regex_tospdeffell)) {
        return  "对手" + translations[RegExp.$1] + "的特防降低了！";
    }
    if (originalStr.match(regex.regex_tospeedfell)) {
        return  "对手" + translations[RegExp.$1] + "的速度降低了！";
    }
    if (originalStr.match(regex.regex_toevasivenessfell)) {
        return  "对手" + translations[RegExp.$1] + "的闪避率降低了！";
    }
    if (originalStr.match(regex.regex_toaccuracyfell)) {
        return  "对手" + translations[RegExp.$1] + "的命中率降低了！";
    }
    if (originalStr.match(regex.regex_attackrosesharply)) {
        return  translations[RegExp.$1] + "的攻击大幅提高了！";
    }
    if (originalStr.match(regex.regex_defenserosesharply)) {
        return  translations[RegExp.$1] + "的防御大幅提高了！";
    }
    if (originalStr.match(regex.regex_spatkrosesharply)) {
        return  translations[RegExp.$1] + "的特攻大幅提高了！";
    }
    if (originalStr.match(regex.regex_spdefrosesharply)) {
        return  translations[RegExp.$1] + "的特防大幅提高了！";
    }
    if (originalStr.match(regex.regex_speedrosesharply)) {
        return  translations[RegExp.$1] + "的速度大幅提高了！";
    }
    if (originalStr.match(regex.regex_evasivenessrosesharply)) {
        return  translations[RegExp.$1] + "的闪避率大幅提高了！";
    }
    if (originalStr.match(regex.regex_accuracyrosesharply)) {
        return  translations[RegExp.$1] + "的命中率大幅提高了！";
    }
    if (originalStr.match(regex.regex_attackfellharshly)) {
        return  translations[RegExp.$1] + "的攻击大幅降低了！";
    }
    if (originalStr.match(regex.regex_defensefellharshly)) {
        return  translations[RegExp.$1] + "的防御大幅降低了！";
    }
    if (originalStr.match(regex.regex_spatkfellharshly)) {
        return  translations[RegExp.$1] + "的特攻大幅降低了！";
    }
    if (originalStr.match(regex.regex_spdeffellharshly)) {
        return  translations[RegExp.$1] + "的特防大幅降低了！";
    }
    if (originalStr.match(regex.regex_speedfellharshly)) {
        return  translations[RegExp.$1] + "的速度大幅降低了！";
    }
    if (originalStr.match(regex.regex_evasivenessfellharshly)) {
        return  translations[RegExp.$1] + "的闪避率大幅降低了！";
    }
    if (originalStr.match(regex.regex_accuracyfellharshly)) {
        return  translations[RegExp.$1] + "的命中率大幅降低了！";
    }
    if (originalStr.match(regex.regex_attackrose)) {
        return  translations[RegExp.$1] + "的攻击提高了！";
    }
    if (originalStr.match(regex.regex_defenserose)) {
        return  translations[RegExp.$1] + "的防御提高了！";
    }
    if (originalStr.match(regex.regex_spatkrose)) {
        return  translations[RegExp.$1] + "的特攻提高了！";
    }
    if (originalStr.match(regex.regex_spdefrose)) {
        return  translations[RegExp.$1] + "的特防提高了！";
    }
    if (originalStr.match(regex.regex_speedrose)) {
        return  translations[RegExp.$1] + "的速度提高了！";
    }
    if (originalStr.match(regex.regex_evasivenessrose)) {
        return  translations[RegExp.$1] + "的闪避率提高了！";
    }
    if (originalStr.match(regex.regex_accuracyrose)) {
        return  translations[RegExp.$1] + "的命中率提高了！";
    }
    if (originalStr.match(regex.regex_attackfell)) {
        return  translations[RegExp.$1] + "的攻击降低了！";
    }
    if (originalStr.match(regex.regex_defensefell)) {
        return  translations[RegExp.$1] + "的防御降低了！";
    }
    if (originalStr.match(regex.regex_spatkfell)) {
        return  translations[RegExp.$1] + "的特攻降低了！";
    }
    if (originalStr.match(regex.regex_spdeffell)) {
        return  translations[RegExp.$1] + "的特防降低了！";
    }
    if (originalStr.match(regex.regex_speedfell)) {
        return  translations[RegExp.$1] + "的速度降低了！";
    }
    if (originalStr.match(regex.regex_evasivenessfell)) {
        return  translations[RegExp.$1] + "的闪避率降低了！";
    }
    if (originalStr.match(regex.regex_accuracyfell)) {
        return  translations[RegExp.$1] + "的命中率降低了！";
    }
    if (originalStr.match(regex.regex_toattackh)) {
        return  "对手" + translations[RegExp.$1] + "的攻击已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_todefnseh)) {
        return  "对手" + translations[RegExp.$1] + "的防御已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_tospah)) {
        return  "对手" + translations[RegExp.$1] + "的特攻已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_tospdh)) {
        return  "对手" + translations[RegExp.$1] + "的特防已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_tospeh)) {
        return  "对手" + translations[RegExp.$1] + "的速度已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_toevasivengessh)) {
        return  "对手" + translations[RegExp.$1] + "的闪避率已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_toaccuracyh)) {
        return  "对手" + translations[RegExp.$1] + "的命中率已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_attackh)) {
        return  translations[RegExp.$1] + "的攻击已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_defnseh)) {
        return  translations[RegExp.$1] + "的防御已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_spah)) {
        return  translations[RegExp.$1] + "的特攻已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_spdh)) {
        return  translations[RegExp.$1] + "的特防已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_speh)) {
        return  translations[RegExp.$1] + "的速度已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_evasivengessh)) {
        return  translations[RegExp.$1] + "的闪避率已经无法再提高了！";
    }
    if (originalStr.match(regex.regex_accuracyh)) {
        return  translations[RegExp.$1] + "的命中率已经无法再提高了！";
    }

    if (originalStr.match(regex.regex_rejectchallenge)) {
        return  RegExp.$1 + "拒绝了挑战。";
    }
    if (originalStr.match(regex.regex_thesustookto)) {
        return  "替身承受了伤害保护了对手的" + translations[RegExp.$1] ;
    }
    if (originalStr.match(regex.regex_thesustook)) {
        return  "替身承受了伤害保护了" + translations[RegExp.$1] ;
    }
    if (originalStr.match(regex.regex_tohbawi)) {
        return  "对手的" + translations[RegExp.$1] + "受到了来自" + translations[RegExp.$2] + "死缠烂打的折磨";
    }
    if (originalStr.match(regex.regex_hbawi)) {
        return  translations[RegExp.$1] + "受到了来自对手" + translations[RegExp.$2] + "死缠烂打的折磨";
    }
    if (originalStr.match(regex.regex_toihb)) {
        return  "对手的" + translations[RegExp.$1] + "受到了" + translations[RegExp.$2] + "的伤害";
    }
    if (originalStr.match(regex.regex_ihb)) {
        return  translations[RegExp.$1] + "受到了" + translations[RegExp.$2] + "的伤害";
    }
    if (originalStr.match(regex.regex_iseoto)) {
        return  "这对对手的" + translations[RegExp.$1] + "非常有效";
    }
    if (originalStr.match(regex.regex_iseo)) {
        return  "这对" + translations[RegExp.$1] + "非常有效";
    }
    if (originalStr.match(regex.regex_isnveoto)) {
        return  "这对对手的" + translations[RegExp.$1] + "不是很有效";
    }
    if (originalStr.match(regex.regex_isnveo)) {
        return  "这对" + translations[RegExp.$1] + "不是很有效";
    }
    if (originalStr.match(regex.regex_achoto)) {
        return  "击中了对手" + translations[RegExp.$1] + "的要害";
    }
    if (originalStr.match(regex.regex_acho)) {
        return  "击中了" + translations[RegExp.$1] + "的要害";
    }
    if (originalStr.match(regex.regex_setc)) {
        return  RegExp.$1 + "单败淘汰赛";
    }
    if (originalStr.match(regex.regex_willuse)) {
        return   RegExp.$1 + "将使用" + RegExp.$2;
    }
    if (originalStr.match(regex.regex_willswitchin)) {
        return   RegExp.$1 + "将替换" + RegExp.$2 + "上场";
    }
    if (originalStr.match(regex.regex_challengex)) {
        return  "挑战" + RegExp.$1;
    }
    if (originalStr.match(regex.regex_uteamsvf)) {
        return  "您的队伍在" + RegExp.$1 + "分级可以合法使用";
    }
    if (originalStr.match(regex.regex_Metronome)) {
        return "摇手指让它使出了" + translations[RegExp.$1] + "！";
    }
    if (originalStr.match(regex.regex_toiatbabi)) {
        return  "对手的" + translations[RegExp.$1] +"受到了来自它" + translations[RegExp.$2] + "的攻击！";
    }
    if (originalStr.match(regex.regex_iatbabi)) {
        return  translations[RegExp.$1] +"受到了来自它" + translations[RegExp.$2] + "的攻击！";
    }
    if (originalStr.match(regex.regex_toctop)) {
        return  "对手的" + translations[RegExp.$1] +"腐蚀了" + translations[RegExp.$2] + "的" + translations[RegExp.$3];
    }
    if (originalStr.match(regex.regex_ctop)) {
        return  translations[RegExp.$1] +"腐蚀了对手" + translations[RegExp.$2] + "的" + translations[RegExp.$3];
    }
    if (originalStr.match(regex.regex_biftato)) {
        return  "但没能影响到对手的" + translations[RegExp.$1] + "！";
    }
    if (originalStr.match(regex.regex_bifta)) {
        return  "但没能影响到" + translations[RegExp.$1] + "！";
    }
    if (originalStr.match(regex.regex_toshpif)) {
        return  "对手的" + translations[RegExp.$1] + "HP已满！";
    }
    if (originalStr.match(regex.regex_shpif)) {
        return  translations[RegExp.$1] + "HP已满！";
    }
    if (originalStr.match(regex.regex_tobiuiz)) {
        return  "对手的" + translations[RegExp.$1] + "利用Z力量强化了自身的" + translations[RegExp.$2] + "！";
    }
    if (originalStr.match(regex.regex_biuiz)) {
        return  translations[RegExp.$1] + "利用Z力量强化了自身的" + translations[RegExp.$2] + "！";
    }
    if (originalStr.match(regex.regex_tobisdizp)) {
        return  "对手的" + translations[RegExp.$1] + "利用Z力量强化了自身的特防！";
    }
    if (originalStr.match(regex.regex_tobisaizp)) {
        return  "对手的" + translations[RegExp.$1] + "利用Z力量强化了自身的特攻！";
    }
    if (originalStr.match(regex.regex_bisdizp)) {
        return  translations[RegExp.$1] + "利用Z力量强化了自身的特防！";
    }
    if (originalStr.match(regex.regex_bisaizp)) {
        return  translations[RegExp.$1] + "利用Z力量强化了自身的特攻！";
    }
    if (originalStr.match(regex.regex_tobstct)) {
        return  "对手的" + translations[RegExp.$1] + "的属性转变成了" + translations[RegExp.$2] + "！";
    }
    if (originalStr.match(regex.regex_bstct)) {
        return  translations[RegExp.$1] + "的属性转变成了" + translations[RegExp.$2] + "！";
    }
    if (originalStr.match(regex.regex_towhbisb)) {
        return  "对手的" + translations[RegExp.$1] + "受到了附着针的伤害！";
    }
    if (originalStr.match(regex.regex_whbisb)) {
        return  translations[RegExp.$1] + "受到了附着针的伤害！";
    }
    if (originalStr.match(regex.regex_twpsrtosa)) {
        return  "弱点保险大幅提高了对手" + translations[RegExp.$1] + "的攻击！";
    }
    if (originalStr.match(regex.regex_twpsrtossa)) {
        return  "弱点保险大幅提高了对手" + translations[RegExp.$1] + "的特攻！";
    }
    if (originalStr.match(regex.regex_twpsrsa)) {
        return  "弱点保险大幅提高" + translations[RegExp.$1] + "的攻击！";
    }
    if (originalStr.match(regex.regex_twpsrssa)) {
        return  "弱点保险大幅提高了" + translations[RegExp.$1] + "的特攻！";
    }
    if (originalStr.match(regex.regex_thwctfto)) {
        return  "对手" + translations[RegExp.$1] + "的治愈之愿实现了！";
    }
    if (originalStr.match(regex.regex_thwctf)) {
        return  translations[RegExp.$1] + "的治愈之愿实现了！";
    }
    if (originalStr.match(regex.regex_psdito)) {
        return  "锋利的岩石扎进了对手的" + RegExp.$1 + "的身体";
    }
    if (originalStr.match(regex.regex_psdi)) {
        return  "锋利的岩石扎进了" + RegExp.$1 + "的身体";
    }
    if (originalStr.match(regex.regex_sfwhrrm)) {
        return  RegExp.$1 + "衷心的祈愿传递到了烈空坐那里！";
    }
    if (originalStr.match(regex.regex_sfwhrtorm)) {
        return  RegExp.$1 + "衷心的祈愿传递到了对手的烈空坐那里！";
    }

// 多个可能特性
    if (originalStr[0] == " " && originalStr.indexOf(', ') > 0) {
        let ret: string[] = [];
        for (let ability of originalStr.trim().split(', ')) {
            ret.push(trans_from_dict(ability));
        }
        return ret.join('，');
    }
// else
    return originalStr.replace("Turn", "回合");
}


export function translateElement(element: HTMLElement): void {
    if (element.tagName === 'SCRIPT') {
        console.log('Skipping script element');
        return;
    }
    var elTW = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    var node: Node | null = null;
    var translate = t;
    while ((node = elTW.nextNode()) != null) {
        console.log('Processing node:', node);
        console.log('Node type:', node.nodeType);
        if (node.parentNode) {
            console.log('Parent node tag name:', (node.parentNode as Element).tagName);
        }
        if (node.parentNode && (node.parentNode as Element).tagName === 'SCRIPT') {
            console.log('Skipping text node within script element');
            continue;
        }
        var value = node.nodeValue;
        if (value && value.length > 200) {
            console.log('Skipping long text node');
            continue;
        }
        if (node.parentNode && (node.parentNode as Element).tagName === "STRONG" ||
            node.parentNode && (node.parentNode as Element).getAttribute("class") === "col movenamecol" ||
            node.parentNode && node.parentNode.parentNode && (node.parentNode.parentNode as Element).getAttribute("class") === "col movenamecol" ||
            node.parentNode && (node.parentNode as Element).getAttribute("name") === "chooseMove") {
            if (node.nodeValue === "Psychic") {
                node.nodeValue = "精神强念";
            } else if (node.nodeValue === "Metronome") {
                node.nodeValue = "挥指";
            } else if (node.nodeValue === "Refresh") {
                node.nodeValue = "焕然一新";
            }
            console.log('Translated text:', node.nodeValue);
            continue;
        }
        if (value && node.nodeValue?.indexOf('•') !== -1) {
            value = value.replace('•', "").replace('Psychic', "精神强念").replace('Metronome', "挥指").replace('Refresh', "焕然一新");
            value = translate(value, translations);
            node.nodeValue = "• " + value;
            console.log('Translated text:', node.nodeValue);
            continue;
        }
        if (node.nodeValue) {
            node.nodeValue = translate(node.nodeValue.replace("é", "e"), translations);
            console.log('Translated text:', node.nodeValue);
        }
    }
}
