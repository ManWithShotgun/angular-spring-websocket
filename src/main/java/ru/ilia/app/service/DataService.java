package ru.ilia.app.service;

import java.util.HashMap;

public interface DataService {

    String getResult(final String ksi, final String mass);

    HashMap<String, String> getAllResults(final String ksi);
}
