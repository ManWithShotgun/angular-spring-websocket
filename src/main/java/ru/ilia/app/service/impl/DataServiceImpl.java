package ru.ilia.app.service.impl;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import ru.ilia.app.service.DataService;

import java.util.HashMap;
import java.util.Map;

@Service
public class DataServiceImpl implements DataService {

    private HashMap<String, HashMap<String, String>> database = new HashMap<>();
    private Map<String, String> customValues = new HashMap<>();


    public DataServiceImpl() {
        HashMap<String, String> dataSmm001 = new HashMap<>();
        dataSmm001.put("92", "1.06178857435021");
        dataSmm001.put("99", "1.15128488626385");
        dataSmm001.put("222", "1.19144730357768");
        dataSmm001.put("315", "1.21323273909261");
        dataSmm001.put("413", "1.21308845227264");
        dataSmm001.put("566", "1.20063904156244");
        dataSmm001.put("662", "1.19080980458061");
        dataSmm001.put("757", "1.14339458712534");
        dataSmm001.put("795", "1.12496111020824");
        dataSmm001.put("886", "1.08675691414999");
        dataSmm001.put("1044", "0.991876112300337");
        dataSmm001.put("1174", "0.918239146783523");
        dataSmm001.put("1471", "0.698270266164395");
        dataSmm001.put("2138", "0.294353459014719");
        dataSmm001.put("2841", "0.0949642731795702");
        dataSmm001.put("3536", "0.0302675143064834");
        dataSmm001.put("4327", "0.00873436711509305");
        dataSmm001.put("4986", "0.00354294832982600");

        HashMap<String, String> dataSmm0002 = new HashMap<>();
        dataSmm0002.put("7", "0.0422911853669169");
        dataSmm0002.put("92", "0.0455782905395418");
        dataSmm0002.put("186", "0.0473614726175304");
        dataSmm0002.put("283", "0.0480322079110225");
        dataSmm0002.put("377", "0.0489104373218941");
        dataSmm0002.put("475", "0.0488055827214477");
        dataSmm0002.put("572", "0.0490973299440967");
        dataSmm0002.put("664", "0.0484006224406146");
        dataSmm0002.put("755", "0.0481020169254173");
        dataSmm0002.put("853", "0.0472273178425408");
        dataSmm0002.put("951", "0.0463685245061274");
        dataSmm0002.put("1083", "0.0437158137398881");
        dataSmm0002.put("1427", "0.0379970464081949");
        dataSmm0002.put("1992", "0.0276261539663936");
        dataSmm0002.put("2643", "0.0173228149410967");
        dataSmm0002.put("3113", "0.0116157246209434");
        dataSmm0002.put("3578", "0.00760185361320799");
        dataSmm0002.put("3945", "0.00527665565983102");
        dataSmm0002.put("4126", "0.00439621966472274");
        dataSmm0002.put("4403", "0.00333639860164256");
        dataSmm0002.put("4989", "0.00189836394573680");
        database.put("0.001", dataSmm001);
        database.put("0.0002", dataSmm0002);
        // custom values
        customValues.put("4800", "0.00289836394573680");
        customValues.put("4900", "0.00220836394573680");
        customValues.put("5000", "0.00200836394573680");
    }

    // FIX: the method should not returns null
    @Override
    public String getResult(String ksi, String mass) {
        String result = database.get(ksi).get(mass);
        if (StringUtils.isBlank(result)) {
            return calculateEmulation(mass);
        }
        return result;
    }

    private String calculateEmulation(String mass) {
        System.out.println("Calculation emulation by thread sleep. Mass: " + mass);
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return customValues.get(mass);
    }

    @Override
    public Map<String, String> getAllResults(String ksi) {
        HashMap<String, String> stringStringHashMap = database.get(ksi);
        return MapUtils.emptyIfNull(stringStringHashMap);
    }
}
